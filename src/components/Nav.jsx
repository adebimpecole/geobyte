import React, { useEffect, useContext, useState } from "react";
import { Context } from "../utilis/context";
import { fetchDataFromFirestore } from "../utilis/firebaseFunctions";

const Nav = () => {
  const { setId, id, nav, setNav } = useContext(Context);

  const [user, setUser] = useState({});

  const getName = async () => {
    let the_user = await fetchDataFromFirestore("geouser", "userId", id);

    setUser(the_user);
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <div className="lg:ml-72 lg:px-8 sm:px-6 sm:gap-x-6 px-4 bg-white border-liltransparent border-b-[1px] gap-x-4 h-16 flex z-[8] lg:absolute fixed  shadow-sm shadow-liltransparent w-full flex-1 right-0 top-0 box-border">
      <button
        type="button"
        className="lg:hidden text-black p-[0.625rem] -m-[0.625rem] bg-transparent"
        onClick={() => setNav(!nav)}
      >
        <span className="absolute w-[1px] h-[1px] p-0 -m[1px] overflow-hidden whitespace-nowrap border-0">
          Open sidebar
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className={`w-6 h-6 ${nav ? `hidden` : `block`}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${nav ? `block` : `hidden`}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <span className="sm:text-7 text-black pr-0 pl-8 py-0 border-0 w-full h-full lg:block none"></span>
      <div
        className="hidden w-[1px] h-6 bg-liltransparent"
        aria-hidden="true"
      ></div>
      <div className="lg:gap-x-6 self-stretch gap-x-4 flex-1 flex">
        <div className="lg:gap-x-6 gap-x-4 items-center flex">
          <button
            type="button"
            className="p-0 -m[1px] color-blue bg-transparent"
          >
            <span className="absolute w-[1px] h-[1px] p-0 -m[1px] overflow-hidden whitespace-nowrap border-0 ">
              View notifications
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              ></path>
            </svg>
          </button>
          <div
            className="lg:bg-liltransparent lg:w-[1px] lg:h-6 lg:block hidden"
            aria-hidden="true"
          ></div>
          <div className="relative" data-headlessui-state="">
            <button
              className="p-[0.375] items-center flex -m-[0.375] bg-transparent"
              id="headlessui-menu-button-1"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <span className="absolute w-[1px] h-[1px] p-0 -m[1px] overflow-hidden whitespace-nowrap border-0">
                Open user menu
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-blue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <span className="lg:items-center lg:flex hidden pr-8">
                {user != {} && (
                  <span
                    className="text-black leading-6 font-semibold text-sm ml-4 w-max capitalize"
                    aria-hidden="true"
                  >
                    {user.first_name} {user.last_name}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-blue w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
