import React, { Fragment, useState, useEffect } from "react";
import Modal from "./addPlotModal.component";
import EditPlotModal from "./editPlotModal.component";
import EditSVG from "../../components/SVG-components/editSVG.component";
import DeleteSVG from "../../components/SVG-components/deleteSVG.component";
import AddUnit from "./addUnit.component";
import "./home.component.scss";
import Swal from "sweetalert2";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenPlant, setIsOpenPlant] = useState(false);
  const [selectedPlot, setSelected] = useState(0);
  const [plots, setPlots] = useState([]);
  const [units, setUnits] = useState([]);

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
    const swalDelete = await Swal.fire({
      icon: "question",
      title: "Are you sure you want to delete this plot?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (swalDelete.isConfirmed) {
      try {
        const deletePlot = await fetch(`http://localhost:5000/plot/${id}`, {
          method: "DELETE",
        });
        setPlots(plots.filter((plot) => plot.plot_id !== id));
        Swal.fire("Deleted!", "", "success");
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  // Delete a unit
  const deleteUnit = async (id, plot_id) => {
    const swalDeleteUnit = await Swal.fire({
      icon: "question",
      title: "Are you sure you want to delete this plant?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (swalDeleteUnit.isConfirmed)
      try {
        const deleteUnit = await fetch(`http://localhost:5000/unit/${id}`, {
          method: "DELETE",
        });
        const updatedPlots = plots.map((el) => {
          if (plot_id === el.plot_id) {
            el.plotUnits = el.plotUnits.filter((unit) => unit.unit_id !== id);
          }
          return el;
        });
        setPlots(updatedPlots);
        Swal.fire("Deleted!", "", "success");
      } catch (error) {
        console.error(error.message);
      }
  };

  // Get a unit
  const getUnits = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/plot/${id}`);
      const jsonData = await response.json();
      setUnits(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const openEditModal = ({ plot }) => {
    setSelected(plot);
    setIsOpenEdit(true);
  };

  const closeModal = () => {
    setIsOpenEdit(false);
    setIsOpenPlant(false);
  };

  useEffect(() => {
    getPlots();
  }, []);

  useEffect(() => {
    getUnits();
  }, []);

  console.log(units);

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

                      <th scope="col">Harvest</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plot.plotUnits.map((item) => (
                      <tr className="unit-table-data">
                        <th scope="row">{item.plant_type}</th>
                        <td>-</td>
                        <td>-</td>
                        <td>
                          <button
                            className="btn btn-danger btn-remove"
                            onClick={() =>
                              deleteUnit(item.unit_id, plot.plot_id)
                            }
                          >
                            <DeleteSVG />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="container-plot-buttons">
                  <div className="plot-buttons">
                    <div stlye={BUTTON_WRAPPER_STYLE}>
                      <div className="addPlanttButton">
                        <button
                          className="btn btn-success btn-space"
                          onClick={() => setIsOpenPlant(true)}
                        >
                          Add Plant
                        </button>
                        <AddUnit
                          plot={plot.plot_id}
                          open={isOpenPlant}
                          onClose={() => closeModal()}
                        >
                          {console.log(plot.plot_id)}
                        </AddUnit>
                      </div>

                      <div stlye={BUTTON_WRAPPER_STYLE}>
                        <div className="editPlotButton">
                          <button
                            className="btn btn-warning btn-space"
                            onClick={() => openEditModal({ plot })}
                          >
                            Edit
                          </button>
                          <EditPlotModal
                            plot={selectedPlot}
                            open={isOpenEdit}
                            onClose={(plot = null) => {
                              if (plot) {
                                const updatedPlots = plots.map((el) => {
                                  if (el.plot_id === plot.plot_id) {
                                    el = plot;
                                  }
                                  return el;
                                });
                                setPlots(updatedPlots);
                              }

                              closeModal();
                            }}
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
