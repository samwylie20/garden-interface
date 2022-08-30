import { useState, useEffect } from "react";
import Modal from "./addPlantModal.component";
import EditSVG from "./editSVG.component";
import DeleteSVG from "./deleteSVG.component";
import "./plantLibrary.component.scss";
import Swal from "sweetalert2";
// Timeline
import Timeline from "react-calendar-timeline";
// Make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

const PlantLibrary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [plants, setPlants] = useState([]);

  // Timeline
  // https://github.com/namespace-ee/react-calendar-timeline
  const groups = plants.map((plant, index) => {
    return {
      title: plant.plant_name,
      id: index + 1,
    };
  });

  const items = plants.map((plant, index) => {
    return {
      group: index + 1,
      title: plant.plant_name,
      id: index + 1,
      start_time: moment.unix(plant.start_time),
      end_time: moment.unix(plant.end_time),
    };
  });

  // Get all plants data
  const getPlants = async () => {
    try {
      const response = await fetch("http://localhost:5000/plants");
      const jsonData = await response.json();
      setPlants(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  // Delete a plant
  const deletePlant = async (id) => {
    const swalDelete = await Swal.fire({
      icon: "question",
      title: "Are you sure you want to delete this plant?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (swalDelete.isConfirmed)
      try {
        // const deletePlant = await fetch(`http://localhost:5000/plants/${id}`, {
        //   method: "DELETE",
        //  });
        setPlants(plants.filter((plant) => plant.id !== id));
        Swal.fire("Deleted!", "", "success");
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
          {plants.map((plant) => (
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
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, "months")}
        defaultTimeEnd={moment().add(12, "months")}
        minZoom={60 * 60 * 24 * 365}
        traditionalZoom={true}
      />
    </div>
  );
};

const BUTTON_WRAPPER_STYLE = {
  position: "relative",
  zIndex: 1,
};

export default PlantLibrary;
