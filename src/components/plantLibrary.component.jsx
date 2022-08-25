import { useState, useEffect } from "react";
import Modal from "./addPlantModal.component";
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

  useEffect(() => {
    getPlants();
  }, []);

  // Takes the boolean value and returns it as string with first letter capitalized
  function capitalizeFirstLetterBool(s) {
    let string = s.toString();
    return string[0].toUpperCase() + string.substring(1);
  }

  return (
    <div className="container">
      <div className="grid-padding">
        <h2 className="text-center">Welcome to your Plant Library</h2>
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
              <td>{plant.growth_time}</td>
              <td>{plant.season}</td>
              <td>{plant.ideal_plant_time}</td>
              <td>{plant.ideal_harvest_time}</td>
              <td>{plant.ideal_climate}</td>
              <td>{plant.need_cover ? "True" : "False"}</td>
              <td>
                <button className="btn btn-warning btn-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="8"
                    fill="currentColor"
                    class="bi bi-pen"
                    viewBox="0 0 16 16"
                  >
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                  </svg>
                </button>
                <button className="btn btn-danger btn-remove">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    class="bi bi-trash3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div stlye={BUTTON_WRAPPER_STYLE} className="container">
        <div className="addPlantButton">
          <button className="btn btn-success" onClick={() => setIsOpen(true)}>
            Add New Plant
          </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
        </div>
      </div>
    </div>
  );
};

const BUTTON_WRAPPER_STYLE = {
  position: "relative",
  zIndex: 1,
};

export default PlantLibrary;
