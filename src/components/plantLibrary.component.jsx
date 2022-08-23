import { useState, useEffect } from "react";
import "./plantLibrary.component.scss";

const PlantLibrary = () => {
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

  return (
    <div className="container">
      <div className="grid-padding">
        <h3 className="text-center">Welcome to your Plant Library</h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Growth Time</th>
            <th scope="col">Season</th>
            <th scope="col">Ideal Sow</th>
            <th scope="col">Ideal Harvest</th>
            <th scope="col">Climate</th>
            <th scope="col">Need Cover</th>
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
              <td>{plant.need_cover.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PlantLibrary;
