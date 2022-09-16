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

  console.log(units);

  return (
    <Fragment>
      {/* HOME CONTAINER */}
      <div className="container mx-auto">
        {/* TITLE */}
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-green-400 text-center">
          Your Plots...
        </h2>
        <button
          className="p-2 rounded-lg uppercase font-semibold mr-auto text-slate-800 bg-green-400 hover:bg-green-300"
          onClick={() => setIsOpen(true)}
        >
          Add New Plot
        </button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
        {/* FLEX CONTAINER */}
        <div className="flex flex-col justify-between items-start text-center p-5 md:flex-row">
          {plots.map((plot) => (
            <div className="p-7">
              <h5 className="mt-1 text-lg font-bold tracking-tight text-green-400">
                {plot.plot_name}
              </h5>
              <p className="mt-1 text-xs font-semibold text-yellow-300 pb-2">
                ID - {plot.plot_id}
              </p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-gray-400 bg-slate-600">
                      Name
                    </th>
                    <th scope="col" className="text-gray-400 bg-slate-800">
                      Progress
                    </th>
                    <th scope="col" className="text-gray-400 bg-slate-600">
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
                          onClick={() => deleteUnit(item.unit_id, plot.plot_id)}
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
                    className="bg-green-400 text-gray-800 uppercase font-semibold tracking-tight rounded-lg p-2 hover:bg-green-300"
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
                    className="bg-yellow-400 text-gray-800 uppercase font-semibold tracking-tight rounded-lg p-2 hover:bg-yellow-300"
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
                    className="bg-red-500 text-gray-800 uppercase font-semibold tracking-tight rounded-lg p-2 hover:bg-red-400"
                    onClick={() => deletePlot(plot.plot_id)}
                  >
                    Delete
                  </button>
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
