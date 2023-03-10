import "./product.css";
import Header from "../../components/markets/header/MarketHeader";
import MailList from "../../components/markets/mailList/MailList";
import Footer from "../../components/markets/footer/MarketFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Link, useHistory, useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import Reserve from "../../components/markets/reserve/Reserve";
import SingleUser from "./SingleUser";
import AppButton from "../../components/AppButton/AppButton";
import Topbar from "../../components/topbar/Topbar";
import ProductMedia from "./productMedia/ProductMedia";
import { Box, Typography } from "@mui/material";
import { Divider } from "@material-ui/core";
import { format } from "date-fns";
import axios from "axios";
const Product = () => {
  const baseURL = `${process.env.REACT_APP_BASE_URL}`;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + currentUser.token;
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log("Vao Hotels");

  const [openModal, setOpenModal] = useState(false);
  
  const history = useHistory();
  const handelDeposit = (payload)=> {
    axios.post(`${process.env.REACT_APP_BASE_URL}/payments`,
      payLoad,opts)
      .then((res)=>{
        console.log("Resss",res);

        if(res.data.result.url) {

          window.location.assign(res.data.result.url)
        }
      }).catch((err)=>{
        console.log(err);
      })
  }

  const { data, loading, error } = useFetch(`${baseURL}/products/${id}`,opts);
  let payLoad = 
    {
      customerAddress: "string",
      price: data.price,
      customerEmail: currentUser.email,
      customerName:currentUser.name,
      customerPhone: currentUser.phone,
      productId: +id,
      paymentMethod:"card",
      status:"sucssess",
  }
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;



  return (
    <div>
      {/* <Navbar /> */}
      {/* <Header type="list" /> */}
      <Topbar></Topbar>
      {loading ? (
        "loading"
      ) : (
        <div className="productDetailBody">
          <div className="hotelContainer">
            <div className="pdBody">
              <div className="hotelWrapper">
                <h1 className="hotelTitle">{data.name}</h1>
                <span className="hotelDistance">
                  Địa chỉ: –{" "}
                  {data.address ||
                    "Số 28 , Đường Giải Phóng, Quận Hai Bà Trưng"}
                </span>
                <span className="hotelPriceHighlight">
                  Bán căn hộ Vinhomes Grand Park Quận Hai Bà Trưng
                </span>

                <ProductMedia product={data}></ProductMedia>

                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    {/* <h1 className="hotelTitle">{data.title}</h1> */}
                    {/* <p className="hotelDesc">{data.description}</p> */}
                    <Box sx={{ width: "100%", maxWidth: 500 }}>
                      <Typography variant="h5" gutterBottom>
                        Thông tin mô tả:
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Giá bán: " + (data.price || "2,9 tỷ")}
                      </Typography>
                      <Divider></Divider>

                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Mô tả: " + data.description}
                      </Typography>
                      <Divider></Divider>

                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Số phòng ngủ:" + data.numOfBedrooms}
                      </Typography>
                      <Divider></Divider>

                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Số phòng tắm: " + data.numOfBathrooms}
                      </Typography>
                      <Divider></Divider>

                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Số tầng:" + data.numOfFloors}
                      </Typography>
                      <Divider></Divider>

                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Diện tích: " + data.squaredMeterArea}
                      </Typography>
                      <Divider></Divider>

                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Chiều dài: " + data.lengthMeter}
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Chiều rộng: " + data.widthMeter}
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Dịa chỉ: " + data.address || "Hà Đông, Hà Nội"}
                      </Typography>
                      <Divider></Divider>
                      <Typography
                        sx={{
                          fontFamily: "Lato",
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        {"Sổ đỏ: " + data.address || "Chưa có"}
                      </Typography>
                      <Divider></Divider>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "Lato",
                        padding: "10px 0px",
                      }}
                      variant="h5"
                      gutterBottom
                    >
                      Bản đồ:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Lato",
                        padding: "10px 0px",
                      }}
                      variant="h7"
                      gutterBottom
                    >
                      {"Địa chỉ: " + data.description}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="userAndDeposit">
                <SingleUser></SingleUser>
                <div className="hotelDetailsPrice">
                  {/* <h1></h1> */}
                  <span>{data.title}</span>
                  <p>{data.description}</p>
                  <h2>
                    <b>
                      {data.price ??
                        Math.floor(Math.random() * (10000 - 1000 + 1) + 1)}{" "}
                      VNĐ
                    </b>
                  </h2>
                  {/* <Link to={`/checkout`} style={{ textDecoration: "none", width: "100%",
                      display: "flex"
                   }}> */}
                    <AppButton
                      text={"Đặt cọc ngay"}
                      onClick={handelDeposit}
                    ></AppButton>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            <div className="productMapContainer">
              <iframe
                class="gmapIframeProductDtail"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=1200&amp;height=800&amp;hl=en&amp;q=Hà Nội&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
            <br></br>
            <MailList />
            <Footer />
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};
export default Product;
