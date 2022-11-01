import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Section = () => {
  // const location = useLocation();
  // const { state } = location.state;

  const [plots, setPlots] = useState([]);
  const [units, setUnits] = useState([]);

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
    getPlots();
  }, []);

  useEffect(() => {
    getUnits();
  }, []);

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
        <div className="navbar-end">
          <div className="btn btn-outline btn-primary">Add Plot</div>
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
