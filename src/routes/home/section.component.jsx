import { useState, useEffect } from "react";

const Section = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalUnit, setShowModalUnit] = useState(false);
  const [plots, setPlots] = useState([]);
  const [units, setUnits] = useState([]);
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Get all plots by Section ID
  const getPlots = async () => {
    try {
      const response = await fetch(`http://localhost:8000/plot`);
      const jsonData = await response.json();
      setPlots(jsonData);
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
      const response = await fetch(`http://localhost:8000/plotunits/${2}`);
      const jsonData = await response.json();
      setUnits(jsonData);

      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  // Form Control Functions
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Form Control
  const [inputs, setInputs] = useState({
    name: "",
    section_id: 5, // Hard coded, just after section ID refactor
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { name, section_id } = inputs;
      const body = { name, section_id };
      const response = await fetch("http://localhost:8000/plot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("Build Plot - Clicked");
      setShowModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  //  Add Unit/Plant Form Control Functions
  const onChange_unit = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Form Control
  const [inputsUnit, setInputsUnit] = useState({
    name: "",
    section_id: 5, // Hard coded, just after section ID refactor
  });

  const onSubmitForm_unit = async (e) => {
    e.preventDefault();
    try {
      const { name, section_id } = inputs;
      const body = { name, section_id };
      const response = await fetch("http://localhost:8000/unit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("Build Plot - Clicked");
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
            SECTION NAME HERE... 🌱☘️🌵
          </h2>
        </div>
        {/* Add Plot Modal */}
        <div className="navbar-end">
          <label htmlFor="add-plot-modal" onClick={() => setShowModal(true)}>
            <div className="btn btn-outline btn-primary">Add Plot</div>
          </label>
          <input
            type="checkbox"
            id="add-plot-modal"
            className={showModal ? "modal-toggle" : "modal-close"}
          />
          <div className="modal">
            <div className="modal-box">
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
                  <button
                    htmlFor="add-plot-modal"
                    className="btn"
                    type="submit"
                    onSubmit={onSubmitForm}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*  FLEX CONTAINER FOR PLOT CARDS */}
      <div className="flex flex-col items-start text-center md:flex-row md:flex-wrap">
        {plots.map((plot) => (
          <div className="card w-80 m-4 bg-base-100 shadow-xl border-accent border-2 mt-3 md:hover:scale-105 md:w-86 md:mt-1">
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
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {units.map((unit) => (
                        <tr className="unit-table-data">
                          <th scope="row">{unit.name}</th>
                          <th scope="row">{formatDate(unit.planted_at)} </th>
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
                      onChange={(e) => onChange_unit(e)}
                    />
                    {plants.map((option) => (
                      <option value={option.name}>{option.plant_name}</option>
                    ))}

                    <button
                      className="btn btn-outline btn-primary ml-2 text-lg"
                      type="submit"
                      onSubmit={onSubmitForm_unit}
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
