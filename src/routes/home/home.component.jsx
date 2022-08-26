import React, { Fragment, useState, useEffect } from "react";
import Modal from "./addPlotModal.component";
import EditPlotModal from "./editPlotModal.component";
import EditSVG from "../../components/editSVG.component";
import DeleteSVG from "../../components/deleteSVG.component";
import "./home.component.scss";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
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

  // Delete a unit
  const deleteUnit = async (id) => {
    try {
      const deleteUnit = await fetch(`http://localhost:5000/unit/${id}`, {
        method: "DELETE",
      });
      setUnits(unit.filter((unit) => unit.unit_id !== id));
      window.location = "/"; // Page not auto updating upon click
    } catch (error) {
      console.error(error.message);
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
                            <EditSVG />
                          </button>
                          <button
                            className="btn btn-danger btn-remove"
                            onClick={() => deleteUnit(item.unit_id)}
                          >
                            <DeleteSVG />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="container">
                  <div className="plot-buttons">
                    <button className="btn btn-success btn-space">
                      Add Plant
                    </button>

                    <div stlye={BUTTON_WRAPPER_STYLE}>
                      <div className="editPlotButton">
                        <button
                          className="btn btn-warning btn-space"
                          onClick={() => setIsOpenEdit(true)}
                        >
                          Edit
                        </button>
                        <EditPlotModal
                          plot={plot.plot_id}
                          open={isOpenEdit}
                          onClose={() => setIsOpenEdit(false)}
                        >
                          {console.log(plot.plot_id)}
                        </EditPlotModal>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePlot(plot.plot_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
