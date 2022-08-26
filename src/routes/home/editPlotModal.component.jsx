import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./home.component.scss";

const EditPlotModal = ({ open, children, onClose, plot }) => {
  const [inputs, setInputs] = useState({
    plot_name: "",
  });
  if (!open) return null;

  const { plot_name } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log(plot);
      const body = { plot_name };
      const response = await fetch(
        `http://localhost:5000/plot/${plot.plot_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      plot.plot_name = plot_name;
      onClose(plot_name);

      console.log(plot);
    } catch (error) {
      console.error(error.message);
    }
  };

  return ReactDOM.createPortal(
    <>
      {console.log(plot, "plot")}
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children}
        <h2 className="text-center">Edit Plot</h2>
        <form onSubmit={onSubmitForm}>
          <label className="editModalLabel">Name</label>
          <input
            type="text"
            name="plot_name"
            placeholder={plot.plot_name}
            className="form-control my-3"
            value={plot_name}
            onChange={(e) => onChange(e)}
          />
          {/* <label className="editModalLabel">Size</label>
          <input
            type="text"
            name="size"
            placeholder="New size"
            className="form-control my-3"
            value={size}
            onChange={(e) => onChange(e)}
          />
          <label className="editModalLabel">Covered</label>
          <input
            type="text"
            name="covered"
            placeholder="True/False"
            className="form-control my-3"
            value={covered}
            onChange={(e) => onChange(e)}
          /> */}
          <button className="btn btn-success btn-block " type="submit">
            Update
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

export default EditPlotModal;

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
