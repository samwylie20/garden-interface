import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="title-container" to="/">
          <h6 className="navbar-brand">Home</h6>
        </Link>
        <Link to="/plantlibrary">
          <h6 className="navbar-brand">Plant Library</h6>
        </Link>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
