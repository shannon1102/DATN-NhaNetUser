import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./AppButton.css";
function AppButton({
  type = "button",
  addtionalStyles = {},
  text = "",
  isLoading = false,
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="app-button"
      style={{
        color: "#fff",
        backgroundColor: "#4F59D4",
        border: "none",
        height: "45px",
        borderRadius: "23px",
        padding: "10px 20px",
        fontWeight: 500,
        fontSize: '14px',
        ...addtionalStyles,
      }}
    >
      {isLoading ? <CircularProgress color="white" size="20px" /> : text}
    </button>
  );
}

export default AppButton;
