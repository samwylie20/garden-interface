import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditPlotModal from "./editPlotModal.component";
import Swal from "sweetalert2";
import Section from "./section.component";
import DeleteSVG from "../../components/SVG-components/deleteSVG.component";

const Home = () => {
  //const [isOpen, setIsOpen] = useState(false);
  const [isOpenSec, setIsOpenSec] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  // const openEditModal = ({ plot }) => {
  //   setSelected(plot);
  //   setIsOpenEdit(true);
  // };

  // const openPlantModal = ({ plot }) => {
  //   setSelected(plot);
  //   setIsOpenPlant(true);
  // };

  // const closeModal = () => {
  //   setIsOpenEdit(false);
  //   setIsOpenPlant(false);
  //   setSelected(null);
  // };

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

  const closeSecModal = () => {
    setIsOpenSec(true);
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
      // window.location = "/";
      getSections();
      setShowModal(false);
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
                htmlFor="add-plot-modal"
                onClick={() => setShowModal(true)}
              >
                <div className="btn btn-outline btn-primary"> New Section</div>
              </label>
              <div
                onClick={() => setShowModal(false)}
                className={`modal ${showModal ? "modal-open" : ""}`}
              >
                <div onClick={(e) => e.stopPropagation()} className="modal-box">
                  <form
                    className="relative"
                    htmlFor="add-section-modal"
                    onSubmit={onSubmitForm}
                  >
                    <div className="form-control w-full max-w-xs">
                      <h3 className="text-lg font-bold text-center text-primary">
                        New Section
                      </h3>
                      <label className="label">
                        <span className="label-text">
                          Enter section name...
                        </span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FLEX CONTAINER FOR SECTIONS - PLOTS - PLOT UNITS */}
        <div className="flex flex-col items-start text-center md:flex-row md:flex-wrap">
          {section.map((sect) => (
            <div className="card w-80 m-4 bg-base-100 shadow-xl border-accent border-2 mt-3 md:hover:scale-105 md:w-86 md:mt-1">
              <div className="card-body">
                <Link to="/section" state={{ state: sect }}>
                  <h5 className="text-md font-bold tracking-tight text-neutral hover:text-primary">
                    {sect.name}
                  </h5>
                </Link>
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
                        {/* <EditPlotModal
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
                        > */}
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
