import { useState, useEffect } from "react";
import Modal from "./addPlantModal.component";
import EditSVG from "./editSVG.component";
import DeleteSVG from "./deleteSVG.component";
import "./plantLibrary.component.scss";

const PlantLibrary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [plant, setPlant] = useState([]);
  // Get all plants data
  const getPlants = async () => {
    try {
      const response = await fetch("http://localhost:5000/plants");
      const jsonData = await response.json();
      setPlant(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  // Delete a plant
  const deletePlant = async (id) => {
    try {
      const deleteUnit = await fetch(`http://localhost:5000/plants/${id}`, {
        method: "DELETE",
      });
      setPlant(plant.filter((plant) => plant.plant_id !== id));
      window.location = "/plantlibrary"; // Page not auto updating upon click
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getPlants();
  }, []);

  return (
    <div className="container">
      <div className="grid-padding">
        <h2 className="text-center">Welcome to your Plant Library</h2>
        <div stlye={BUTTON_WRAPPER_STYLE} className="container">
          <div className="addPlantButton">
            <button className="btn btn-success" onClick={() => setIsOpen(true)}>
              Add New Plant
            </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Growth Time (weeks)</th>
            <th scope="col">Season</th>
            <th scope="col">Ideal Planting</th>
            <th scope="col">Ideal Harvest</th>
            <th scope="col">Climate</th>
            <th scope="col">Need Cover</th>
            <th scope="col">Edit/Remove</th>
          </tr>
        </thead>
        <tbody>
          {plant.map((plant) => (
            <tr>
              <th scope="row">{plant.plant_name}</th>
              <td>{plant.plant_type}</td>
              <td className="text-center">{plant.growth_time}</td>
              <td>{plant.season}</td>
              <td>{plant.ideal_plant_time}</td>
              <td>{plant.ideal_harvest_time}</td>
              <td>{plant.ideal_climate}</td>
              <td>{plant.need_cover ? "True" : "False"}</td>
              <td>
                <button className="btn btn-warning btn-edit">
                  <EditSVG />
                </button>
                <button
                  className="btn btn-danger btn-remove"
                  onClick={() => deletePlant(plant.id)}
                >
                  <DeleteSVG />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BUTTON_WRAPPER_STYLE = {
  position: "relative",
  zIndex: 1,
};

export default PlantLibrary;
