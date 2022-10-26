import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const AddUnit = ({ open, children, onClose, plot }) => {
  // console.log(plot, "inside add unit");
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  // Get plant options from Library
  const plantOptions = async () => {
    try {
      const response = await fetch("http://localhost:5000/plants");
      const jsonData = await response.json();
      setPlants(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    plantOptions();
  }, []);

  const handleSelect = (e) => {
    //console.log(e.target.value);
    setSelectedPlant(e.target.value);
  };

  if (!open) return null;
  const onSubmitForm = async (e) => {
    console.log(e, "e");

    e.preventDefault();
    try {
      const body = {
        plant_type: selectedPlant,
        plot_id: plot.plot_id,
      };
      const response = await fetch("http://localhost:5000/units", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const plant = await response.json();

      //console.log(plant, "onsubmit plant");
      onClose(plant);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={() => onClose()}/>
      <div style={MODAL_STYLES}>
        {children}
        <h4 className="text-center">Add new plant...</h4>
        <form onSubmit={onSubmitForm}>
          <select name="plant" value={selectedPlant} onChange={handleSelect}>
            {plants.map((option) => (
              <option value={option.name}>{option.plant_name}</option>
            ))}
          </select>
          {selectedPlant && (
            <button className="btn btn-success btn-block" type="submit">
              Submit
            </button>
          )}
          {!selectedPlant && (
            <button
              className="btn btn-disabled btn-block"
              disabled
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
        <button className="btn btn-danger btn-block" onClick={onClose}>
          Close
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default AddUnit;
// TODO RESTYLE LATER
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  borderRadius: "50px"
};

// TODO RESTYLE LATER
const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};
