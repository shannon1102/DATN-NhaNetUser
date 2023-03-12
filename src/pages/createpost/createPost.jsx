import React from "react";
import ProductForm from "../../components/markets/productForm/ProductForm";
import "./createPost.css";
import {useState} from "react"
import Footer from "../../components/markets/footer/MarketFooter";
import { Paper } from "@material-ui/core";
import Topbar from "../../components/topbar/Topbar";
import PlaceIcon from '@material-ui/icons/Place';
import { red } from "@material-ui/core/colors";
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div><PlaceIcon style={{ color: red[500] }} fontSize='large'></PlaceIcon></div>;
export default function CreatePost({ user }) {
  

  const defaultProps = {
    center: {
      lat: 21.0278,
      lng: 105.8342
    },
    zoom: 16
  };
  const [geo,setGeo] = useState({
    lat: 21.0278,
    lng: 105.8342
  });
  return (
    <>
      <Topbar></Topbar>
      <div className="createPost">
        <Paper>
          <h1 className="createPost__title">Đăng tin mới</h1>
        </Paper>
        <div className="createPost__address">
          <div className="addressSelect__container">
            <ProductForm setGeo={setGeo}></ProductForm>
            <div className="map__container">
              <div style={{ height: "100%", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
                  defaultCenter={{lat: geo?.lat || defaultProps.center.lat,lng: geo?.lng || defaultProps.center.lng}}
                  defaultZoom={defaultProps.zoom}
                >
                  <AnyReactComponent
                    lat={geo?.lat || 21.0278}
                    lng={geo?.lng || 105.8342}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
