import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div className="top-0 left-0 right-0 container mx-auto p-6 ">
        {/* FLEX CONTAINER */}
        <div className="flex items-center justify-between">
          <div className="flex items">
            <h6 class="text-3xl font-bold pr-2 tracking-tight">
              Visual Garden DB
            </h6>
            <img src={require("./logo.png")} alt="" className="w-10 h-10" />
          </div>
          {/* LINK CONTAINER */}
          <div className="flex items-center justify-center md:justify-end">
            <Link className="" to="/">
              <h6 className="text-2xl font-bold p-2 tracking-tight hover:text-green-400">
                Plots
              </h6>
            </Link>
            <p className="text-2xl pl-2 font-bold">|</p>
            <Link to="/plantlibrary">
              <h6 className="text-2xl font-bold pl-4 tracking-tight hover:text-green-400">
                Plant Library
              </h6>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
