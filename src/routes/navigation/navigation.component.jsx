import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="title-container" to="/">
          <h3 className="navbar-brand">Home</h3>
        </Link>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
