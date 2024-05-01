import React, { useContext } from "react";

import { Context } from "../utilis/context";

import { auth } from "../config/firebase/firebase";
import { signOut } from "firebase/auth";

const SideNav = () => {
  const { setPage, nav } = useContext(Context);

  // Signing out
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.href = "/";
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" lg:flex lg:flex-col lg:w-72 lg:z-[9] lg:inset-y-0 fixed w-full block">
      <div
        className={`pb-4 lg:px-6 overflow-y-auto flex flex-col gap-x-5 flex-1 bg-blue lg:static  h-[100vh] fixed ${
          nav ? `left-0` : `-left-96`
        }`}
      >
        <div className="flex items-center shrink-0 h-16 text-white font-bold text-2xl text-center w-full pt-4 pl-16">
          Geobyte
        </div>
        <nav className="flex flex-col flex-1 justify-between">
          <ul role="list" className="flex flex-col justify-between pt-10">
            <li className="flex-1">
              <ul role="list" className="-mx-2 flex flex-col gap-y-2">
                <li onClick={() => setPage("Home")}>
                  <a
                    href="#"
                    className="text-white hover:bg-activeblue hover:text-white bg-activeblue leading-6 font-semibold text-sm p-2 px-8 lg:px-2 rounded-md gap-y-7 flex items-center gap-x-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 shrink-0 lg:block hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      ></path>
                    </svg>
                    Home
                  </a>
                </li>
                <li onClick={() => setPage("Location")}>
                  <a
                    href="#"
                    className="text-inactiveblue hover:bg-activeblue hover:text-white leading-6 font-semibold text-sm p-2 px-8 lg:px-2 rounded-md gap-y-7 flex items-center gap-x-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className=" w-6 h-6 shrink-0 lg:block hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      ></path>
                    </svg>
                    Location
                  </a>
                </li>
                <li onClick={() => setPage("Routes")}>
                  <a
                    href="#"
                    className="text-inactiveblue hover:bg-activeblue hover:text-white  leading-6 font-semibold text-sm p-2 px-8 lg:px-2 rounded-md gap-y-7 flex items-center gap-x-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className=" w-6 h-6 shrink-0 lg:block hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      ></path>
                    </svg>
                    Routes
                  </a>
                </li>
                <li onClick={() => setPage("Record")}>
                  <a
                    href="#"
                    className="text-inactiveblue hover:bg-activeblue hover:text-white leading-6 font-semibold text-sm p-2 px-8 lg:px-2 rounded-md gap-y-7 flex items-center gap-x-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className=" w-6 h-6 shrink-0 lg:block hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      ></path>
                    </svg>
                    Records
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul role="list" className="flex flex-col justify-between pt-10">
            <li
              className="mt-auto -mx-2 relative bottom-0 h-max"
              onClick={() => setPage("Home")}
            >
              <a
                href="#"
                className="text-inactiveblue hover:bg-activeblue hover:text-white leading-6 font-semibold text-sm p-2 px-8 lg:px-2 rounded-md gap-y-7 flex items-center gap-x-4 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 shrink-0 lg:block hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Settings
              </a>
            </li>
            <li
              className="mt-auto -mx-2 relative bottom-0 h-max"
              onClick={handleLogout}
            >
              <a
                href="#"
                className="text-inactiveblue hover:bg-activeblue hover:text-white leading-6 font-semibold text-sm p-2 px-8 lg:px-2 rounded-md gap-y-7 flex items-center gap-x-4 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 lg:block hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;
