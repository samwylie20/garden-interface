import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTruckLoading } from "react-icons/fa";
import DeleteSVG from "../../components/SVG-components/deleteSVG.component";

const Section = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalUnit, setShowModalUnit] = useState(false);
  const [plots, setPlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const location = useLocation();
  // console.log(location);

  const section = location.state.state;

  // Get all plots by Section ID
  const getPlots = async () => {
    try {
      const response = await fetch(`http://localhost:8000/plot/`);
      const jsonData = await response.json();
      const filter_by_id = jsonData.filter(
        (el) => el.section_id === section.id
      );
      setPlots(filter_by_id);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPlots();
  }, []);

  // Get all units by plot ID
  const getUnits = async () => {
    try {
      const response = await fetch(`http://localhost:8000/plotunits`);
      const jsonData = await response.json();
      setUnits(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUnits(plots.id);
  }, []);

  // Form Control Functions
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Form Control
  const [inputs, setInputs] = useState({
    name: "",
    section_id: section.id,
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { name, section_id } = inputs;
      const body = { name, section_id };
      const response = await fetch("http://localhost:8000/plot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("Build Plot - Clicked");
      await getPlots();
      setShowModal(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  };

  //  Add Unit/Plant Form Control Functions
  const onChange_unit = ({ plant_id, plot_id }) => {
    setInputsUnit({
      plant_id,
      plot_id,
    });
  };

  // Form Control
  const [inputsUnit, setInputsUnit] = useState({
    plant_id: "",
    plot_id: "",
  });

  const onSubmitForm_unit = async () => {
    try {
      const { plant_id, plot_id } = inputsUnit;
      const body = { plant_id, plot_id };
      const response = await fetch("http://localhost:8000/units", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      getUnits();
      setShowModalUnit(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get plant options from Library
  const plantOptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/plants");
      const jsonData = await response.json();
      setPlants(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    plantOptions();
  }, []);

  // Delete a unit
  const deleteUnit = async (id) => {
    // const swalDeleteUnit = await Swal.fire({
    //   icon: "question",
    //   title: "Are you sure you want to delete this plant?",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes",
    // });
    // if (swalDeleteUnit.isConfirmed)
    try {
      await fetch(`http://localhost:8000/unit/${id}`, {
        method: "DELETE",
      });
      // const updatedPlots = plots.map((el) => {
      //   if (plot_id === el.plot_id) {
      //     el.plotUnits = el.plotUnits.filter((unit) => unit.unit_id !== id);
      //   }
      //   return el;
      // });

      setUnits(units.filter((unit) => unit.id !== id));
      getUnits();
      // Swal.fire("Deleted!", "", "success");
    } catch (error) {
      console.error(error.message);
    }
  };

  // Date format fucntion
  function formatDate(input) {
    let change = new Date(input);
    return change.toDateString();
  }

  return (
    <div className="container mx-auto">
      {/* Home Nav Bar */}
      <div className="navbar bg-base-100 pt-4">
        {/* Title */}
        <div className="navbar-start">
          <h2 className="text-2xl font-bold tracking-tight text-neutral hover:text-primary">
            {section.name} 🌱☘️🌵
          </h2>
        </div>
        {/* Add Plot Modal */}
        <div className="navbar-end">
          <label htmlFor="add-plot-modal" onClick={() => setShowModal(true)}>
            <div className="btn btn-outline btn-primary">Add Plot</div>
          </label>

          <div
            onClick={() => setShowModal(false)}
            className={`modal ${showModal ? "modal-open" : ""}`}
          >
            <div onClick={(e) => e.stopPropagation()} className="modal-box">
              <h3 className="font-bold text-lg">Enter plot name...</h3>
              <form
                className="relative"
                htmlFor="add-plot-modal"
                onSubmit={onSubmitForm}
              >
                <div className="form-control w-full max-w-xs">
                  <input
                    type="text"
                    placeholder="Type here"
                    name="name"
                    className="input input-bordered w-full max-w-xs"
                    value={inputs.name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="modal-action">
                  {isLoading ? (
                    <FaTruckLoading className={"spinning"} />
                  ) : (
                    <button
                      htmlFor="add-plot-modal"
                      className="btn btn-outline btn-primary"
                      type="submit"
                      onSubmit={onSubmitForm}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*  FLEX CONTAINER FOR PLOT CARDS */}
      <div className="flex flex-col items-start text-center md:flex-row md:flex-wrap">
        {plots.map((plot) => (
          <div className="card w-80 m-4 bg-base-100 shadow-xl border-accent border-2 mt-3 md:w-160 md:hover:scale-105 md:w-86 md:mt-1">
            <div className="card-body">
              {plot.name}
              <div className="card-actions justify-center">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th scope="col" className="text-gray-400 bg-slate-600">
                          Name
                        </th>
                        <th scope="col" className="text-gray-400 bg-slate-800">
                          Planted
                        </th>
                        <th scope="col" className="text-gray-400 bg-slate-600">
                          ID
                        </th>
                        <th scope="col" className="text-gray-400 bg-slate-600">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {units
                        .filter((el) => el.unit_plot_id === plot.id)
                        .map((unit) => (
                          <tr className="unit-table-data">
                            <th scope="row">{unit.unit_plant_name}</th>
                            <th scope="row">{formatDate(unit.date)} </th>
                            <th scope="row">{unit.id}</th>
                            <th scope="row">
                              <button onClick={() => deleteUnit(unit.id)}>
                                <DeleteSVG />
                              </button>
                            </th>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {/* ADD PLANT BUTTON/MODAL CONTAINER */}
                <div className="container mx-auto">
                  <div className="flex flex-row justify-between">
                    <h5 className="font-bold text-sm mr-2">Add Plant</h5>

                    <select
                      name="plant"
                      className="input input-bordered w-full max-w-xs"
                      value={selectedPlant}
                      onChange={(e) =>
                        onChange_unit({
                          plant_id: e.target.value,
                          plot_id: plot.id,
                        })
                      }
                    >
                      {plants.map((option) => (
                        <option value={option.id}>{option.name}</option>
                      ))}
                    </select>
                    <button
                      className="btn btn-outline btn-primary ml-2 text-lg"
                      type="submit"
                      onClick={onSubmitForm_unit}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
