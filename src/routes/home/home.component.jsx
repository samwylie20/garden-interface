import React, { Fragment, useState, useEffect } from "react";
import Modal from "./addPlotModal.component";
import EditPlotModal from "./editPlotModal.component";
import EditSVG from "../../components/SVG-components/editSVG.component";
import DeleteSVG from "../../components/SVG-components/deleteSVG.component";
import AddUnit from "./addUnit.component";
import "./home.component.scss";
import Swal from "sweetalert2";
import Harvest from "./harvestComponent.component";

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
      const response = await fetch("http://localhost:8000/plot");
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
        const deletePlot = await fetch(`http://localhost:8000/plot/${id}`, {
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
        const deleteUnit = await fetch(`http://localhost:8000/unit/${id}`, {
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
      const response = await fetch(`http://localhost:8000/plot/${id}`);
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

  const openPlantModal = ({ plot }) => {
    setSelected(plot);
    setIsOpenPlant(true);
  };

  const closeModal = () => {
    setIsOpenEdit(false);
    setIsOpenPlant(false);
    setSelected(null);
  };

  useEffect(() => {
    getPlots();
  }, []);

  useEffect(() => {
    getUnits();
  }, []);

  // ADD PLOT FORM CONTROL
  const [inputs, setInputs] = useState({
    plot_name: "",
    size: "",
    covered: "",
  });

  // const { plot_name, size, covered } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { plot_name, size, covered } = inputs;
      const body = { plot_name, size, covered };
      const response = await fetch("http://localhost:8000/plot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("Build Plot - Clicked");
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      {/* HOME CONTAINER */}
      <div className="container mx-auto">
        {/* HOME NAVBAR --- TITLE + ADD PLOT BUTTON */}
        <div className="navbar bg-base-100 pt-4">
          {/* TITLE */}
          <div className="navbar-start">
            <h2 className="text-2xl font-bold tracking-tight text-neutral hover:text-primary">
              Your Plots... 🌱☘️🌵
            </h2>
          </div>
          {/* ADD PLOT MODAL CONTAINER */}
          <div className="navbar-end">
            <div>
              <label
                htmlFor="add-plot-modal"
                className="btn btn-outline btn-primary modal-button"
              >
                New Plot
              </label>
              <input
                type="checkbox"
                id="add-plot-modal"
                className="modal-toggle"
              />
              <label htmlFor="add-plot-modal" className="modal cursor-pointer">
                <form
                  className="modal-box relative"
                  htmlFor=""
                  onSubmit={onSubmitForm}
                >
                  <div className="form-control w-full max-w-xs">
                    <h3 className="text-lg font-bold text-center text-primary">
                      New Plot
                    </h3>
                    <label className="label">
                      <span className="label-text">
                        Enter your plot name...
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      name="plot_name"
                      className="input input-bordered w-full max-w-xs"
                      value={inputs.plot_name}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="label">
                      <span className="label-text">
                        Enter your plot size...
                      </span>
                    </label>
                    <input
                      type="text"
                      name="size"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      value={inputs.size}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="label">
                      <span className="label-text">
                        Is this plot covered? True or False
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      name="covered"
                      className="input input-bordered w-full max-w-xs"
                      value={inputs.covered}
                      onChange={(e) => onChange(e)}
                    />
                    <button
                      className="btn btn-outline btn-primary shadow-xl m-5"
                      type="submit"
                      value="Submit"
                      onSubmit={onSubmitForm}
                    >
                      Build Plot
                    </button>
                  </div>
                </form>
              </label>
            </div>
          </div>
        </div>
        {/* FLEX CONTAINER */}
        <div className="flex flex-col justify-between items-start text-center md:flex-row">
          {plots.map((plot) => (
            <div className="card w-96 bg-base-100 shadow-xl border-accent border-2 mt-3 md:hover:scale-105">
              <div className="card-body">
                <div className="card-actions justify-center">
                  <h5 className="text-lg font-bold text-center tracking-tight text-primary">
                    {plot.plot_name}
                  </h5>
                  {/* <p className="mt-1 text-xs font-semibold text-yellow-300 pb-2">
                    ID - {plot.plot_id}
                  </p> */}
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="text-gray-400 bg-slate-600"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="text-gray-400 bg-slate-800"
                          >
                            Progress
                          </th>
                          <th
                            scope="col"
                            className="text-gray-400 bg-slate-600"
                          >
                            Remove
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {plot.plotUnits.map((item) => (
                          <tr className="unit-table-data">
                            <th scope="row">{item.plant_name}</th>
                            <td>
                              <Harvest
                                plantedAt={item.planted_at}
                                growthTime={item.growth_time}
                              />
                            </td>

                            <td>
                              <button
                                className="hover:text-red-500"
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
                    {/* BUTTON CONTAINER */}
                    <div className="container mx-auto">
                      <div className="flex flex-row justify-between">
                        <button
                          className="btn btn-outline btn-primary shadow-xl"
                          onClick={() => openPlantModal({ plot })}
                        >
                          Add Plant
                        </button>
                        <AddUnit
                          key={plot.plot_id}
                          plot={selectedPlot}
                          open={isOpenPlant}
                          onClose={(unit = null) => {
                            if (unit) {
                              const updatedPlots = plots.map((el) => {
                                if (el.plot_id === selectedPlot.plot_id) {
                                  console.log(el, "el");
                                  el.plotUnits.push(unit);
                                }
                                return el;
                              });
                              setPlots(updatedPlots);
                            }

                            closeModal();
                          }}
                        >
                          {/* {console.log(plot.plot_id, "in hom comp")} */}
                        </AddUnit>
                        {/* </div> */}
                        {/* <div className="button-wrapper-style"> */}
                        <button
                          className="btn btn-outline btn-secondary shadow-xl"
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
                          {/* {console.log(plot.plot_id)} */}
                        </EditPlotModal>
                        {/* </div> */}
                        <button
                          className="btn btn-outline btn-primary shadow-xl"
                          onClick={() => deletePlot(plot.plot_id)}
                        >
                          Delete
                        </button>
                      </div>
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

export default Home;
