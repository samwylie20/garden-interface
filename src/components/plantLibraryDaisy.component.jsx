import { useState, useEffect } from "react";
import DeleteSVG from "./SVG-components/deleteSVG.component";
import "./plantLibrary.component.scss";
import Swal from "sweetalert2";

const PlantLibraryDaisy = () => {
  const [plants, setPlants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [units, setUnits] = useState([]);

  // Get all plants data
  const getPlants = async () => {
    try {
      const response = await fetch("http://localhost:8000/plants");
      const jsonData = await response.json();
      setPlants(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPlants();
  }, []);

  // Add Plant Form Control
  const [inputs, setInputs] = useState({
    name: "",
    type: "",
    grow_time: 1,
    ideal_plant: "",
    ideal_harvest: "",
    season: "",
    climate: "",
    notes: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const {
        name,
        type,
        grow_time,
        ideal_plant,
        ideal_harvest,
        season,
        climate,
        need_cover,
        notes,
      } = inputs;
      const body = {
        name,
        type,
        grow_time,
        ideal_plant,
        ideal_harvest,
        season,
        climate,
        need_cover,
        notes,
      };
      const response = await fetch("http://localhost:8000/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      getPlants();
      setShowModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get all units to check against plants
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
    getUnits();
  }, []);

  // Delete a plant
  const deletePlant = async (id) => {
    const swalDelete = await Swal.fire({
      icon: "question",
      title: "Are you sure you want to delete this plant?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    const plantCheck = units.filter((unit) => unit.unit_plant_id === id);
    console.log(plantCheck);
    if (plantCheck.length) {
      Swal.fire(
        "Delete plant failed! The data of this plant is currently being used in a plot and cannot be removed from the library.",
        "",
        "warning"
      );
    } else if (swalDelete.isConfirmed) {
      try {
        const deletePlant = await fetch(`http://localhost:8000/plants/${id}`, {
          method: "DELETE",
        });
        setPlants(plants.filter((plant) => plant.id !== id));
        Swal.fire("Plant deleted!", "", "success");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Library Nav Bar */}
      <div className="navbar bg-base-100 pt-4">
        {/* Title */}
        <div className="navbar-start">
          <h2 className="text-xl font-bold tracking-tight m-3 md:text-2xl md:ml-24">
            Welcome to your<span className="text-primary"> Plant Library</span>
          </h2>
        </div>
        {/* Add Plant Modal Container */}
        <div className="navbar-end">
          <div>
            <label htmlFor="add-plot-modal" onClick={() => setShowModal(true)}>
              <div className="btn btn-outline btn-primary">Add Plant</div>
            </label>
            <div
              onClick={() => setShowModal(false)}
              className={`modal ${showModal ? "modal-open" : ""}`}
            >
              <div onClick={(e) => e.stopPropagation()} className="modal-box">
                <button
                  className="btn btn-outline btn-error shadow-xl top-0 right-0"
                  onClick={() => setShowModal(false)}
                >
                  X
                </button>
                <form
                  className="relative"
                  htmlFor="add-plant-modal"
                  onSubmit={onSubmitForm}
                >
                  <div className="form-control">
                    <h3 className="text-lg font-bold text-center text-primary">
                      New Plant
                    </h3>

                    <label className="p-2">Plant Name</label>
                    <input
                      type="text"
                      placeholder="Name..."
                      name="name"
                      className="input input-bordered w-full"
                      value={inputs.name}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="p-2">
                      Type of plant (Fruit, Vegetable, Herb etc.)
                    </label>
                    <input
                      type="text"
                      placeholder="Type..."
                      name="type"
                      className="input input-bordered w-full"
                      value={inputs.type}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="p-2">Growth Time (Months)</label>
                    <input
                      type="Number"
                      placeholder="Type here"
                      name="grow_time"
                      className="input input-bordered w-full"
                      value={inputs.grow_time}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="p-2">Ideal Planting Time (Month/s)</label>
                    <input
                      type="text"
                      placeholder="January"
                      name="ideal_plant"
                      className="input input-bordered w-full"
                      value={inputs.ideal_plant}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="p-2">Ideal Harvest Time (Month/s)</label>
                    <input
                      type="text"
                      placeholder="December"
                      name="ideal_harvest"
                      className="input input-bordered w-full"
                      value={inputs.ideal_harvest}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="p-2">Season</label>
                    <input
                      type="text"
                      placeholder="Summer"
                      name="season"
                      className="input input-bordered w-full"
                      value={inputs.season}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="p-2">Climate</label>
                    <input
                      type="text"
                      placeholder="Temperate"
                      name="climate"
                      className="input input-bordered w-fullx"
                      value={inputs.climate}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="p-2">Need Cover? (True/False)</label>
                    <input
                      type="boolean"
                      placeholder="False"
                      name="need_cover"
                      className="input input-bordered w-full"
                      value={inputs.need_cover}
                      onChange={(e) => onChange(e)}
                    />
                    <label className="p-2">Notes (Max. 300 characters)</label>
                    <input
                      type="text"
                      placeholder="....."
                      name="notes"
                      className="input input-bordered w-full"
                      value={inputs.notes}
                      onChange={(e) => onChange(e)}
                    />
                    <div className="modal-action">
                      <button
                        className="btn btn-outline btn-primary shadow-xl m-5"
                        htmlFor="add-plant-modal"
                        type="submit"
                        value="Submit"
                        onSubmit={onSubmitForm}
                      >
                        Add Plant
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <table className="table table-compact mx-auto shadow-xl border-base-200 border-2 mb-6">
        <thead className="bg-baseGray rounded-full">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Growth Time (weeks)</th>
            <th>Season</th>
            <th>Plant</th>
            <th>Harvest</th>
            <th>Climate</th>
            <th> Remove</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr className="text-center">
              <th scope="row">{plant.name.toUpperCase()}</th>
              <td>{plant.type}</td>
              <td className="text-center">{plant.grow_time}</td>
              <td>{plant.season}</td>
              <td>{plant.ideal_plant}</td>
              <td>{plant.ideal_harvest}</td>
              <td>{plant.climate}</td>
              <td>
                <button className="ml-2" onClick={() => deletePlant(plant.id)}>
                  <DeleteSVG />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default PlantLibraryDaisy;
