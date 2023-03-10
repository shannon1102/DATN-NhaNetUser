import React from "react";
import Button from "@mui/material/Button";
import ProductForm from "../../components/markets/productForm/ProductForm";
import "./createPost.css";

import Footer from "../../components/markets/footer/MarketFooter";
import { Paper } from "@material-ui/core";
import Topbar from "../../components/topbar/Topbar";

export default function CreatePost({ user }) {

  return (
    <>
      <Topbar></Topbar>
      <div className="createPost">
        <Paper>
          <h1 className="createPost__title">Đăng tin mới</h1>
        </Paper>
        <div className="createPost__address">
          <div className="addressSelect__container">
            <ProductForm></ProductForm>
            <div className="map__container">
              {/* <Wrapper apiKey={"AIzaSyAWoHZCpC0OPdn-H4veaUZFWvUTFL18Izc"}>
                <MyMapComponent />
            </Wrapper> */}
              <iframe
                class="gmap_iframe"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=1200&amp;height=800&amp;hl=en&amp;q=Hà Nội&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
      <Footer></Footer>
    </>
  );
}
