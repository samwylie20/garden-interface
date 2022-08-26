import React, { useState } from "react";
import ReactDOM from "react-dom";

const AddUnit = ({ open, children, onClose }) => {
  if (!open) return null;
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        //
      };
      const response = await fetch("http://localhost:5000/units", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //window.location = "/";
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
          <select>
            <option>Tomato</option>
          </select>
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