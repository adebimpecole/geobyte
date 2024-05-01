import React, { useContext, useEffect, useState } from "react";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";

import MapComponent from "../../components/map/MapComponent";
import { Context } from "../../utilis/context";
import { generateCustomId, todaysDate } from "../../utilis/functions";
import { addToFirestore } from "../../utilis/firebaseFunctions";

const Route = () => {
  const { open, setOpen, edit, setEdit, deletes, setDeletes } =
    useContext(Context);

  const [numInputs, setNumInputs] = useState(0); // Initial number of input boxes
  const [data, setData] = useState([]);

  const [origin, setOrigin] = useState();
  const [final, setFinal] = useState();

  // State to manage the selected values for each select box
  const [selectValues, setSelectValues] = useState([]);
  const [calculate, setCalculate] = useState(false);

  const db = getFirestore();

  useEffect(() => {
    // get locations
    const locationCollectionRef = collection(db, "location");
    const query4 = query(locationCollectionRef);

    getDocs(query4)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const locationCollectionRef = [];
          querySnapshot.forEach((doc) => {
            locationCollectionRef.push(doc.data());
          });
          setData(locationCollectionRef);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting location data:", error);
      });
  }, []);

  const handleAddInput = () => {
    if (numInputs < 4) {
      setNumInputs((prevNum) => prevNum + 1);
    } else {
      toast.error("You can add only 4 intermediate routes");
    }
  };

  const handleSelectChange = (e, index, position) => {
    const { value } = e.target;

    const matchingItem = data.find((item) => item.name === value);

    setSelectValues([...selectValues, matchingItem]);
    if (position == "start") {
      setOrigin(matchingItem);
    } else if (position == "end") {
      setFinal(matchingItem);
    }
  };

  const optimizeRoute = async (e) => {
    if (selectValues.length < 3) {
      toast.error(
        "You need to select at least 3 locations to generate the optimal route"
      );
    } else {
      let optimizationId = generateCustomId("OPTZ", 5);
      let date = todaysDate();
      console.log(selectValues);

      const num1 = parseInt(final.cost, 10);
      const num2 = parseInt(origin.cost, 10);
      const sumIntegers = num1 + num2;

      const optimizationData = {
        date: date,
        origin: origin.name,
        final: final.name,
        cost: sumIntegers,
        id: optimizationId,
      };

      // Add the users name to Firestore
      await addToFirestore("optimized", optimizationData);

      setCalculate(true);
    }
  };

  return (
    <form className="pt-24 w-full h-full overflow-scroll flex flex-col items-center">
      <div className=" w-11/12 flex lg:flex-row flex-col justify-between">
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Route Optimization
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 w-[24rem]">
            To generate the optimal route you must select the origin and final
            location with at least one intermediate location.
          </p>

          <div className="mt-10 grid grid-rows-1 gap-y-1 sm:grid-rows-1 items-start">
            <div className="sm:row-span-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Location
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  className="block lg:w-full w-[20rem] capitalize cursor-pointer rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    handleSelectChange(e, numInputs + 1, "start")
                  }
                >
                  {data.length > 0 && (
                    <>
                      <option className="cursor-pointer">
                        Select a location
                      </option>
                      {data.map((dt, index) => (
                        <option key={`itm-${index}`} className="cursor-pointer">
                          {dt.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-[9.5rem] mt-4 text-skyblue cursor-pointer"
                onClick={handleAddInput}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            {[...Array(numInputs)].map((_, index) => (
              <div
                className="sm:row-span-1 flex flex-col"
                key={"select-" + index}
              >
                <div className="mt-2 text-center">
                  <select
                    id="country"
                    name="country"
                    className="block w-[20rem] capitalize cursor-pointer rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => handleSelectChange(e, index, "middle")}
                  >
                    {data.length > 0 && (
                      <>
                        <option className="cursor-pointer">
                          Select a location
                        </option>
                        {data.map((dt, index) => (
                          <option
                            key={`itm-${index}`}
                            className="cursor-pointer"
                          >
                            {dt.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-[9.5rem] mt-4 text-skyblue cursor-pointer"
                  onClick={handleAddInput}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            ))}
            <div className="sm:row-span-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                End Location
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  className="block w-[20rem] capitalize cursor-pointer rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => handleSelectChange(e, numInputs + 1, "end")}
                >
                  {data.length > 0 && (
                    <>
                      <option className="cursor-pointer">
                        Select a location
                      </option>
                      {data.map((dt, index) => (
                        <option key={`itm-${index}`} className="cursor-pointer">
                          {dt.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="sm:row-span-3">
              <div className="mt-2">
                <div
                  className="block w-[20rem] h-9 rounded-md cursor-pointer py-1.5 text-white bg-activeblue text-center font-bold sm:text-sm sm:leading-6"
                  onClick={optimizeRoute}
                >
                  Calculate
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[55%] mt-0 w-11/12">
          {calculate == true && <MapComponent points={selectValues} />}
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Route;
