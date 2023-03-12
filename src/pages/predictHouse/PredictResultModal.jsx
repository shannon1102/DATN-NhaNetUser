import React from "react";
import {
  CloseRounded,
} from "@material-ui/icons";
import "./predictForm.css";
import { Button } from "@material-ui/core";
export default function PredictReultModal({ setIsOpenModal,price }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  price = price*1000000
  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="modalHeader">
          <h1>Kết quả:</h1>
          <Button
            className="closeBtnModal"
            onClick={() => {
                setIsOpenModal(false);
            }}
          >
            <CloseRounded />
          </Button>
        </div>
        <div className="modalBody">
          <h3>{"Ngôi nhà của bạn có giá: " + (price?.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')  || "2,9 tỷ") + " VND" }</h3>

        </div>
      </div>
    </div>
  );
}
