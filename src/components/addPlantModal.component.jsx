import React, { useState } from "react";
import ReactDOM from "react-dom";

// TODO RESTYLE LATER
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
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

export default function Modal({ open, children, onClose }) {
  const [inputs, setInputs] = useState({
    plant_name: "",
    plant_type: "",
    growth_time: "",
    ideal_plant_time: "",
    ideal_harvest_time: "",
    season: "",
    ideal_climate: "",
    need_cover: "",
  });
  if (!open) return null;

  const {
    plant_name,
    plant_type,
    growth_time,
    ideal_plant_time,
    ideal_harvest_time,
    season,
    ideal_climate,
    need_cover,
  } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        plant_name,
        plant_type,
        growth_time,
        ideal_plant_time,
        ideal_harvest_time,
        season,
        ideal_climate,
        need_cover,
      };
      const response = await fetch("http://localhost:5000/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/plantlibrary";
    } catch (error) {
      console.error(error.message);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children}
        <h4 className="text-center">Add new plant...</h4>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="plant_name"
            placeholder="Plant name"
            className="form-control my-3"
            value={plant_name}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="plant_type"
            placeholder="Plant Type"
            className="form-control my-3"
            value={plant_type}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="growth_time"
            placeholder="Growth time (weeks)"
            className="form-control my-3"
            value={growth_time}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="season"
            placeholder="Season"
            className="form-control my-3"
            value={season}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="ideal_plant_time"
            placeholder="Ideal Planting"
            className="form-control my-3"
            value={ideal_plant_time}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="ideal_harvest_time"
            placeholder="Ideal Harvest"
            className="form-control my-3"
            value={ideal_harvest_time}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="ideal_climate"
            placeholder="Climate"
            className="form-control my-3"
            value={ideal_climate}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="need_cover"
            placeholder="True/False"
            className="form-control my-3"
            value={need_cover}
            onChange={(e) => onChange(e)}
          />
          <button className="btn btn-success btn-block " type="submit">
            Submit
          </button>
        </form>
        <button className="btn btn-danger btn-block" onClick={onClose}>
          Close
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
