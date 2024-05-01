import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Records = () => {
  const [locations, setLocations] = useState([]);
  const [usedlocations, setUsedLocations] = useState("N/A");
  const [routes, setRoutes] = useState([]);

  const db = getFirestore();

  useEffect(() => {
    // get locations
    const locationCollectionRef = collection(db, "location");
    const query1 = query(locationCollectionRef);

    getDocs(query1)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const locationCollectionRef = [];
          querySnapshot.forEach((doc) => {
            locationCollectionRef.push(doc.data());
          });
          setLocations(locationCollectionRef);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });

    // get routes
    const routesCollectionRef = collection(db, "optimized");
    const query2 = query(routesCollectionRef);

    getDocs(query2)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const routesCollectionRef = [];
          const usedLocationCollectionRef = [];

          querySnapshot.forEach((doc) => {
            routesCollectionRef.push(doc.data());

            usedLocationCollectionRef.push(doc.data().final);
            usedLocationCollectionRef.push(doc.data().origin);
          });
          setRoutes(routesCollectionRef);
          setUsedLocations(usedLocationCollectionRef);

          // Create an object to store element counts
          const countMap = {};

          // Iterate through the array and count occurrences
          usedLocationCollectionRef.forEach((element) => {
            countMap[element] = (countMap[element] || 0) + 1;
          });

          // Find the element with the highest count
          let mostFrequentElement;
          let maxCount = 0;

          for (const element in countMap) {
            if (countMap[element] > maxCount) {
              mostFrequentElement = element;
              maxCount = countMap[element];
            }
          }
          setUsedLocations(mostFrequentElement);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  }, []);
  return (
    <div className="pt-20 w-full h-full overflow-scroll flex flex-col items-center mx-4">

      <div className="w-full">
        <div className="lg:px-8 sm:px-6 pt-8 px-4 max-w-[80rem]">
          <h2 className="lg:max-w-none lg:mx-0 text-black leading-6 font-semibold">
            Optimized routes
          </h2>
        </div>
        <table className="text-left whitespace-nowrap w-[93%] mt-2 mx-auto box-border">
          <colgroup>
            <col className="sm:w-4/12 w-full" />
            <col className="w-4/12" />
            <col className="w-2/12" />
            <col className="w-1/12" />
            <col className="w-1/12" />
          </colgroup>
          <thead className="text-black leading-6 text-sm border-transparent border-b-[1px] mr-8">
            <tr className=" border-b-[1px] border-liltransparent ">
              <th
                scope="col"
                className="lg:p-4 lg:pt-7 lg:pl-0 sm:p-6 font-semibold pl-4 py-3"
              >
                ID
              </th>
              <th
                scope="col"
                className="sm:table-cell font-semibold pr-8 pl-0 py-3 hidden"
              >
                Start Location
              </th>
              <th
                scope="col"
                className="lg:pr-20 sm:text-left sm:pr-8 font-semibold text-right pr-4 pl-0 py-3"
              >
                Final Location
              </th>
              <th
                scope="col"
                className="lg:pr-0 md:table-cell font-semibold pl-8 py-3 hidden"
              >
                Delivery Date
              </th>
            </tr>
          </thead>
          <tbody className="">
            {routes.length > 0 && (
              <>
                {routes.map((rt, index) => (
                  <tr
                    className="border-b-[1px] border-liltransparent"
                    key={`loc-${index}`}
                  >
                    <td className=" pr-8 pl-0 py-4">
                      <div className="gap-x-4 items-center flex">
                        <div className="text-black leading-6 text-sm  text-ellipsis whitespace-nowrap">
                          {rt.id}
                        </div>
                      </div>
                    </td>
                    <td className="sm:pr-8 sm:table-cell pr-4 pl-0 py-4 hidden">
                      <div className="gap-x-3 flex">
                        <div className=" w-max text-black capitalize leading-6 text-sm ">
                          {rt.origin}
                        </div>
                      </div>
                    </td>
                    <td className="lg:pr-20 text-black truncate sm:pr-8 leading-6 text-sm pr-4 pl-0 py-4">
                      <div className="max-w-[20rem] text-ellipsis whitespace-nowrap capitalize">
                        {rt.final}
                      </div>
                    </td>

                    <td className="lg:pr-20 md:table-cell text-black ml-8 leading-6 text-sm pr-8 pl-8 py-4 hidden">
                      {rt.date}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Records;
