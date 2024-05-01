import React, { useContext } from "react";

import { Context } from "../utilis/context";
import SideNav from "./SideNav";
import Nav from "./Nav";
import Home from "../pages/dashboard/Home";
import Locations from "../pages/dashboard/Locations";
import Route from "../pages/dashboard/Route";
import Records from "../pages/dashboard/Records";

const Screen = () => {
  const { page } = useContext(Context);

  return (
    <div className="">
      <SideNav />
      <div className="lg:ml-72 ">
        <Nav />
        <div>
          {(() => {
            switch (page) {
              case "Home":
                return <Home />;
              case "Location":
                return <Locations />;
              case "Routes":
                return <Route />;
              case "Record":
                return <Records />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Screen;
