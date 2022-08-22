import React, { Fragment, useState, useEffect } from "react";
import Modal from "./addPlotModal.component";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [plots, setPlots] = useState([]);
  const [unit, setUnits] = useState([]);
  // Get all plots
  const getPlots = async () => {
    try {
      const response = await fetch("http://localhost:5000/plot");
      const jsonData = await response.json();
      setPlots(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPlots();
  }, []);

  const getUnits = async () => {
    try {
      const response = await fetch("http://localhost:5000/units");
      const jsonData = await response.json();
      setUnits(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  console.log(plots);
  console.log(unit);

  return (
    <Fragment>
      <div className="container">
        <div stlye={BUTTON_WRAPPER_STYLE}>
          <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
            Add Plot
          </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
        </div>
        <div className="row justify-content">
          {plots.map((plot) => (
            <div className="col-sm-4 well px-md-3">
              <h5 className="text-center">{plot.plot_name}</h5>
              <p className="text-center">
                Size: {plot.size} | Covered: {plot.covered.toString()} | ID:
                {plot.plot_id}
              </p>
              {/* {unit.map((item) => (
                <ul>
                  {item.plant_type}
                  {" - Planted: "} {item.planted_at} - Plot ID: {item.plot_id}
                </ul>
              ))} */}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

const BUTTON_WRAPPER_STYLE = {
  position: "relative",
  zIndex: 1,
};

export default Home;
