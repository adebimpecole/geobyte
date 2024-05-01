import React, { useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";

import "../../App.css";

const MapComponent = ({ points }) => {
  const [distance, setDistance] = useState(0);
  const [costKM, setCostKM] = useState(0);
  const [clearingcost, setClearingcost] = useState(0);

  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFyeWNvbGU3IiwiYSI6ImNsdm1hbjZ2eTAwanEycW82bXIyZjdzNnAifQ.NyW8JqoiT763-IHr2pL58Q";

  useEffect(() => {
    // Initialize map when component mounts
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [points[1].lon, points[1].lat],
      zoom: 11,
    });

    map.on("load", async () => {
      // Add points to the map as markers
      points.forEach((point, index) => {
        map.addLayer({
          id: `point-${index}`,
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: [point.lon, point.lat],
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 8,
            "circle-color": "#3887be",
          },
        });
      });

      let cost = 0;
      // Create lines between points
      for (let i = 0; i < points.length - 1; i++) {
        const start = points[i];
        const end = points[i + 1];

        await getRoute(start, end, map);
        if (i !== 0) {
          cost += parseFloat(
            (parseFloat(clearingcost) + parseFloat(points[i].cost)).toFixed(2)
          );
        } else {
          cost += parseFloat(
            (
              parseFloat(clearingcost) +
              parseFloat(points[points.length - 1].cost)
            ).toFixed(2)
          );
        }
      }
      setClearingcost(cost);
    });

    async function getRoute(start, end, map) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lon},${start.lat};${end.lon},${end.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        if (!data || !data.routes || data.routes.length === 0) {
          return;
        }

        const routeDistance = parseFloat(data.routes[0].distance.toFixed(2)); // Distance in meters
        const routeDistanceKm = parseFloat((routeDistance / 1000).toFixed(2)); // Convert distance to kilometers

        setDistance(routeDistanceKm);
        setCostKM(routeDistanceKm);

        const routeCoordinates = data.routes[0].geometry.coordinates;

        let sourceId = `route-source-${start.lon}-${start.lat}-${end.lon}-${end.lat}`;
        let source = map.getSource(sourceId);

        // Update route data in the existing source
        if (!source) {
          map.addSource(sourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates,
              },
            },
          });

          // Add the layer using the new source
          map.addLayer({
            id: `route-${start.lon}-${start.lat}-${end.lon}-${end.lat}`,
            type: "line",
            source: sourceId,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#FF0000",
              "line-width": 2,
            },
          });
        } else {
          // Update data if source exists
          source.setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: routeCoordinates,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    }

    return () => map.remove();
  }, [points]);

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-4">
        Result
      </h2>

      <div id="map" style={{ width: "100%", height: "400px" }} />
      <div>
        <h2 className="text-base font-semibold mt-4 leading-7 text-gray-900">
          Best Route
        </h2>
        {distance !== 0 ? (
          <ul className="text-sm text-black mt-2">
            <li>Distance: {distance} km</li>
            <li>Cost per km: ${costKM}</li>
            <li>Clearing cost: ${clearingcost}</li>

            <li className="font-semibold mt-2">
              Total cost of delivery: ${costKM + clearingcost}
            </li>
          </ul>
        ) : (
          <span className="text-grey text-sm">Loading...</span>
        )}
      </div>
    </>
  );
};

export default MapComponent;
