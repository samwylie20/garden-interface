import { Outlet, Link } from "react-router-dom";

const NavigationDaisy = () => {
  return (
    <>
      <div className="navbar bg-baseGray rounded-b-3xl p-4">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <Link to="/">
            <p className="btn btn-ghost normal-case text-3xl font-bold text-neutral">
              <span className="text-primary">Visual Garden </span>DB
              <img
                src={require("./logo.png")}
                alt=""
                className="w-7 h-7 md:w-10 md:h-10"
              />
            </p>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Plots</Link>
              </li>
              <li>
                <Link to="/plantlibrary">Plant Library</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavigationDaisy;
