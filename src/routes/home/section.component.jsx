import { useState, useEffect } from "react";

const Section = () => {
  const [plots, setPlots] = useState([]);
  const [units, setUnits] = useState([]);
  // Form Control
  const [inputs, setInputs] = useState({
    name: "",
    section_id: 5, // Hard coded, just after section ID refactor
  });

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
      {/* HOME NAVBAR --- TITLE + ADD PLOT BUTTON */}
      <div className="navbar bg-base-100 pt-4">
        {/* TITLE */}
        <div className="navbar-start">
          <h2 className="text-2xl font-bold tracking-tight text-neutral hover:text-primary">
            SECTION NAME HERE... 🌱☘️🌵
          </h2>
        </div>
        {/* ADD PLOT MODAL */}
        <div className="navbar-end">
          <label htmlFor="add-plot-modal">
            <div className="btn btn-outline btn-primary">Add Plot</div>
          </label>
          <input type="checkbox" id="add-plot-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Enter plot name...</h3>
              <form
                className="relative"
                htmlFor="add-plot-modal"
                onSubmit={onSubmitForm}
              >
                {" "}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
