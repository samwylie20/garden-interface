import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function Modal({ open, children, onClose }) {
  const [inputs, setInputs] = useState({
    plot_name: "",
    size: "",
    covered: "",
  });
  if (!open) return null;

  const { plot_name, size, covered } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { plot_name, size, covered };
      const response = await fetch("http://localhost:5000/plot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children}
        <h2 className="text-center">Build Plot</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="plot_name"
            placeholder="Plot Name"
            className="form-control my-3"
            value={plot_name}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="size"
            placeholder="size"
            className="form-control my-3"
            value={size}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="covered"
            placeholder="True"
            className="form-control my-3"
            value={covered}
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
