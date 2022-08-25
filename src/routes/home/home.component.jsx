import React, { Fragment, useState, useEffect } from "react";
import Modal from "./addPlotModal.component";
import EditPlotModal from "./editPlotModal.component";
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
          {plots.map((plot) => (
            <div className="grid-padding">
              <div className="col-sm-4 well px-md-3">
                <h5 className="text-center header-text-style">
                  {plot.plot_name}
                </h5>
                <p className="text-center">
                  Size: {plot.size} | Covered: {plot.covered.toString()} | ID:
                  {plot.plot_id}
                </p>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Harvest</th>
                      <th scope="col">Edit/Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plot.plotUnits.map((item) => (
                      <tr className="unit-table-data">
                        <th scope="row">{item.plant_type}</th>
                        <td>-</td>
                        <td>-</td>
                        <td>
                          <button className="btn btn-warning btn-edit">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="8"
                              fill="currentColor"
                              class="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>
                          </button>
                          <button className="btn btn-danger btn-remove">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              fill="currentColor"
                              class="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

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
