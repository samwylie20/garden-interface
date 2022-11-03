import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditPlotModal from "./editPlotModal.component";
import Swal from "sweetalert2";
import Section from "./section.component";
import DeleteSVG from "../../components/SVG-components/deleteSVG.component";

const Home = () => {
  //const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenPlant, setIsOpenPlant] = useState(false);
  const [selectedPlot, setSelected] = useState(0);
  const [section, setSection] = useState([]);
  const [plots, setPlots] = useState([]);
  const [units, setUnits] = useState([]);

  // Get all sections
  const getSections = async () => {
    try {
      const response = await fetch("http://localhost:8000/section");
      const jsonData = await response.json();
      setSection(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

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

  const deleteSection = async (id) => {
    try {
      const deleteSection = await fetch(`http://localhost:8000/section/${id}`, {
        method: "DELETE",
      });
      setSection(section.filter((sec) => sec.id !== id));
    } catch (error) {
      console.error(error.meesage);
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

  // MOVE TO PLOT PAGE
  // // Delete a unit
  // const deleteUnit = async (id, plot_id) => {
  //   const swalDeleteUnit = await Swal.fire({
  //     icon: "question",
  //     title: "Are you sure you want to delete this plant?",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes",
  //   });
  //   if (swalDeleteUnit.isConfirmed)
  //     try {
  //       const deleteUnit = await fetch(`http://localhost:8000/unit/${id}`, {
  //         method: "DELETE",
  //       });
  //       const updatedPlots = plots.map((el) => {
  //         if (plot_id === el.plot_id) {
  //           el.plotUnits = el.plotUnits.filter((unit) => unit.unit_id !== id);
  //         }
  //         return el;
  //       });
  //       setPlots(updatedPlots);
  //       Swal.fire("Deleted!", "", "success");
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  // };

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
    getSections();
  }, []);

  useEffect(() => {
    getPlots();
  }, []);

  // Add Section Form Control
  const [inputs, setInputs] = useState({
    name: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { name } = inputs;
      const body = { name };
      const response = await fetch("http://localhost:8000/section", {
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
            <h2 className="text-xl font-bold tracking-tight text-neutral hover:text-primary md:text-2xl">
              Your Gardens... 🌱☘️🌵
            </h2>
          </div>
          {/* ADD SECTION MODAL CONTAINER */}
          <div className="navbar-end">
            <div>
              <label
                htmlFor="add-section-modal"
                className="btn btn-outline btn-primary modal-button"
              >
                New Section
              </label>
              <input
                type="checkbox"
                id="add-section-modal"
                className="modal-toggle"
              />
              <label
                htmlFor="add-section-modal"
                className="modal cursor-pointer"
              >
                <form
                  className="modal-box relative"
                  htmlFor="add-section-modal"
                  onSubmit={onSubmitForm}
                >
                  <div className="form-control w-full max-w-xs">
                    <h3 className="text-lg font-bold text-center text-primary">
                      New Section
                    </h3>
                    <label className="label">
                      <span className="label-text">Enter section name...</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      name="name"
                      className="input input-bordered w-full max-w-xs"
                      value={inputs.name}
                      onChange={(e) => onChange(e)}
                    />
                    <div className="modal-action">
                      <button
                        className="btn btn-outline btn-primary shadow-xl m-5"
                        htmlFor="add-section-modal"
                        type="submit"
                        value="Submit"
                        onSubmit={onSubmitForm}
                      >
                        Build Section
                      </button>
                    </div>
                  </div>
                </form>
              </label>
            </div>
          </div>
        </div>
        {/* FLEX CONTAINER FOR SECTIONS - PLOTS - PLOT UNITS */}
        <div className="flex flex-col items-start text-center md:flex-row md:flex-wrap">
          {section.map((sect) => (
            <div className="card w-80 m-4 bg-base-100 shadow-xl border-accent border-2 mt-3 md:hover:scale-105 md:w-86 md:mt-1">
              <div className="card-body">
                <Link to="/section" state={{ state: "myState" }}>
                  {/* <Section sect={sect} /> */}
                  <h5 className="text-md font-bold tracking-tight text-neutral hover:text-primary">
                    {sect.name}
                  </h5>
                </Link>
                <div className=""></div>
                <div className="card-actions justify-center">
                  <div className="overflow-x-auto">
                    <li>
                      {plots.map((plot) =>
                        plot.section_id === sect.id ? <ul>{plot.name}</ul> : ""
                      )}
                    </li>
                    <button
                      className="ml-56"
                      onClick={() => deleteSection(sect.id)}
                    >
                      <DeleteSVG />
                    </button>
                    {/* BUTTON CONTAINER */}
                    <div className="container mx-auto">
                      <div className="flex flex-row justify-between">
                        {/* <button
                          className="btn btn-outline btn-primary shadow-xl"
                          // onClick={() => openPlantModal({ plot })}
                        >
                          Add Plant
                        </button> */}
                        {/* <AddUnit
                            //key={plot.plot_id}
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
                        {/* </AddUnit> */}
                        {/* </div> */}
                        {/* <div className="button-wrapper-style"> */}
                        {/* <button
                          className="btn btn-outline btn-secondary shadow-xl"
                          //onClick={() => openEditModal({ plot })}
                        >
                          Edit
                        </button> */}
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
                        {/* <button
                          className="btn btn-outline btn-primary shadow-xl"
                          // onClick={() => deletePlot(plot.plot_id)}
                        >
                          Delete
                        </button> */}
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
