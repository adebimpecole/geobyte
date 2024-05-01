import React, { useContext, useEffect, useState } from "react";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import Modal from "../../components/modal/Modal";
import EditModal from "../../components/modal/EditModal";
import DeleteModal from "../../components/modal/DeleteModal";
import { Context } from "../../utilis/context";

const Locations = () => {
  const { open, setOpen, edit, setEdit, deletes, setDeletes } =
    useContext(Context);
  const [data, setData] = useState([]);
  const [selectedlocation, setSelectedLoction] = useState("");

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
        console.error("Error getting user data:", error);
      });
  }, []);

  const editLocation = (dt) => {
    setSelectedLoction(dt);
    setEdit(!edit);
  };

  const deleteLocation = (dt) => {
    setSelectedLoction(dt);
    setDeletes(!deletes);
  };

  return (
    <div className="pt-20 w-full h-full overflow-scroll flex flex-col items-center">
      <div className=" sm:items-center sm:flex-row py-4 gap-y-4 w-[93%] mx-auto  gap-x-8 justify-between items-start flex-col flex">
        <div>
          <div className="gap-x-3 items-center flex">
            <h1 className="leading-7 text-4 gap-x-3 flex">
              <span className="text-black font-semibold">Locations</span>
            </h1>
          </div>
        </div>
        <div
          className="cursor-pointer  bg-blue text-white rounded-lg py-2 px-3 text-sm font-semibold"
          onClick={() => setOpen(!open)}
        >
          + Add Location
        </div>
      </div>
      <table className="text-left whitespace-nowrap w-[93%] mt-2 mx-auto box-border">
        <colgroup>
          <col className="sm:w-2/12 w-full" />
          <col className="w-3/12" />
          <col className="w-4/12 " />
          <col className="w-1/12" />
          <col className="w-1/12" />
        </colgroup>
        <thead className="text-black leading-6 text-sm border-transparent border-b-[1px] mr-8">
          <tr className=" border-b-[1px] border-liltransparent ">
            <th
              scope="col"
              className="lg:p-4  lg:pl-0 sm:p-6 sm:pl-0 pl-0 sm:pr-4 font-semibold py-3 sm:table-cell hidden"
            >
              Location ID
            </th>
            <th
              scope="col"
              className="lg:p-4  lg:pl-0 sm:p-6 font-semibold sm:pl-4 py-3 pl-0"
            >
              Location Name
            </th>
            <th
              scope="col"
              className="lg:table-cell font-semibold pr-8 pl-0 py-3 hidden w-3"
            >
              Address
            </th>
            <th
              scope="col"
              className="lg:pr-20 sm:text-left md:table-cell hidden sm:pr-8 font-semibold text-right pr-4 pl-8 py-3"
            >
              Cost
            </th>
            <th
              scope="col"
              className="lg:pr-20 sm:text-left sm:pr-8 font-semibold text-right pr-4 pl-0 py-3 "
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="acc acx">
          {data.length > 0 && (
            <>
              {data.map((dt, index) => (
                <tr
                  className="border-b-[1px] border-liltransparent"
                  key={`loc-${index}`}
                >
                  <td className=" pr-8 pl-0 py-4 sm:table-cell hidden">
                    <div className="gap-x-4 items-center flex">
                      <div className="text-black leading-6 text-sm  text-ellipsis whitespace-nowrap">
                        {dt.id}
                      </div>
                    </div>
                  </td>
                  <td className="sm:pr-8 table-cell pr-4 pl-0 py-4">
                    <div className="gap-x-3 flex">
                      <div className=" w-max text-black capitalize leading-6 text-sm ">
                        {dt.name}
                      </div>
                    </div>
                  </td>
                  <td className="lg:pr-20 text-black truncate sm:pr-8 lg:table-cell hidden leading-6 text-sm pr-4 pl-0 py-4">
                    <div className="max-w-[20rem] text-ellipsis whitespace-nowrap">
                      {dt.address}
                    </div>
                  </td>

                  <td className="lg:pr-20 md:table-cell text-black ml-8 leading-6 text-sm pr-8 pl-8 py-4 hidden">
                    {dt.cost}
                  </td>

                  <td className="flex gap-y-4 flex-row lg:pr-20 text-blue leading-6 text-sm pr-8 py-4 ">
                    <div className="w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-black hover:text-blue cursor-pointer"
                        onClick={() => editLocation(dt)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </div>
                    <div className="w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 lg:ml-4 ml-0 text-black hover:text-red cursor-pointer"
                        onClick={() => deleteLocation(dt)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <EditModal location={selectedlocation} />
      <DeleteModal location={selectedlocation} />
      <Modal open={open} />
    </div>
  );
};

export default Locations;
