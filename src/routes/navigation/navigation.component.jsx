import { Fragment, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <Fragment>
      <div className="top-0 left-0 right-0 container mx-auto p-6 ">
        {/* FLEX CONTAINER */}
        <div className="flex items-center justify-between">
          <div className="flex items">
            <h6 class="text-lg font-bold pr-2 tracking-tight md:text-3xl">
              Visual Garden DB
            </h6>
            <img
              src={require("./logo.png")}
              alt=""
              className="w-7 h-7 md:w-10 md:h-10"
            />
          </div>
          {/* LINK CONTAINER */}
          <section className="MOBILE-MENU flex">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-1 w-8 bg-gray-400"></span>
              <span className="block h-1 w-8 bg-gray-400"></span>
              <span className="block h-1 w-8 bg-gray-400"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="absolute top-0 right-0 px-3 py-3"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-6 w-6 hover:text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="flex flex-col min-h-[250px]">
                <li className="font-bold text-xl my-10  hover:text-green-400">
                  <Link to="/">Plots</Link>
                </li>
                <li className="font-bold text-xl  hover:text-green-400">
                  <Link to="/plantlibrary">Plant Library</Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 50%;
        height: 25vh;
        top: 30;
        right: 0;
        background:  #404859;
        border-style: solid;
        border-width: 2px;
        border-color: #4ade80; 
        border-radius: 10px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
