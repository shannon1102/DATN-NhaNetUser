import React from "react";
import ProductForm from "../../components/markets/productForm/ProductForm";
import "./predictPrice.css";
import { useState } from "react";
import Footer from "../../components/markets/footer/MarketFooter";
import { Paper } from "@material-ui/core";
import Topbar from "../../components/topbar/Topbar";
import PredictForm from "./Predictform";
import Sidebar from "../../components/sidebar/Sidebar";
import PredictReultModal from "./PredictResultModal";
export default function PredictPrice({ user }) {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [amount, setAmount] = useState();


  return (
    <>
      <Topbar></Topbar>
      <div className="predict">
        <Sidebar></Sidebar>
        <div className="createPost">
          <Paper>
            <h1 className="createPost__title">Nhập thông tin ngôi nhà</h1>
          </Paper>
          <div className="createPost__address">
            <div className="addressSelect__container">
              <PredictForm></PredictForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
