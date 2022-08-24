import React, { Fragment, useState, useEffect } from "react";
import Modal from "./addPlotModal.component";
import "./home.component.scss";

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

  // Delete a plot
  const deletePlot = async (id) => {
    try {
      const deletePlot = await fetch(`http://localhost:5000/plot/${id}`, {
        method: "DELETE",
      });
      setPlots(plots.filter((plot) => plot.plot_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPlots();
  }, []);

  const getUnits = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/plot/${id}`);
      const jsonData = await response.json();
      setUnits(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  // console.log(plots);
  console.log(unit);

  return (
    <Fragment>
      <div className="container">
        <h2 className="text-center">Current Plots...</h2>
        <div stlye={BUTTON_WRAPPER_STYLE} className="container">
          <div className="addPlotButton">
            <button className="btn btn-success" onClick={() => setIsOpen(true)}>
              Add New Plot
            </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
          </div>
        </div>
        <div className="row justify-content">
          <div className="grid-padding">
            {plots.map((plot) => (
              <div className="col-sm-4 well px-md-3">
                <h5 className="text-center header-text-style">
                  {plot.plot_name}
                </h5>
                <p className="text-center">
                  Size: {plot.size} | Covered: {plot.covered.toString()} | ID:
                  {plot.plot_id}
                </p>
                {getUnits(id)}
                <div className="grid-padding-button">
                  <button className="btn btn-success btn-space">
                    Add Plant
                  </button>
                  <button className="btn btn-warning btn-space">
                    Edit Plot
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePlot(plot.plot_id)}
                  >
                    Delete
                  </button>
                </div>
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
      </div>
    </Fragment>
  );
};

const BUTTON_WRAPPER_STYLE = {
  position: "relative",
  zIndex: 1,
};

export default Home;
