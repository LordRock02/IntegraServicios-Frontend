import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const CustomToast = ({ closeToast }) => {
  return (
    <div>
      <p>Some Thing Went Wrong!</p>
      <button onClick={closeToast}>Close</button>
    </div>
  );
};