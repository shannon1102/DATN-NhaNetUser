import "./product.css";
import MailList from "../../components/markets/mailList/MailList";
import Footer from "../../components/markets/footer/MarketFooter";
import { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import PlaceIcon from "@material-ui/icons/Place";
import GoogleMapReact from "google-map-react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { red } from "@mui/material/colors";

const AnyReactComponent = ({ text }) => (
  <div>
    <PlaceIcon style={{ color: red[500] }} fontSize="large"></PlaceIcon>
  </div>
);

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
  const [geo, setGeo] = useState({});

  const history = useHistory();
  const handelDeposit = (payload) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/payments`, payLoad, opts)
      .then((res) => {
        console.log("Resss", res);

        if (res.data.result.url) {
          window.location.assign(res.data.result.url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { data, loading, error } = useFetch(`${baseURL}/products/${id}`, opts);
  console.log("dataaaaaaaaa", data);
  useEffect(() => {
    const fetchGEO = async () => {
      let geoStr = "";
      if (data.city) {
        geoStr = data?.city;
      }
      if (data.district) {
        geoStr = data?.district + "," + data?.city;
      }
      if (data.street) {
        geoStr = data.street + "," + data?.district + "," + data?.city;
      }
      console.log("Geooo stringgg", geoStr);
      if (data.street != "") {
        try {
          let response = await geocodeByAddress(geoStr);
          console.log("GEOOOOOOO", response);
          let geoCode = await getLatLng(response[0]);
          setGeo(geoCode);
          console.log("GEOOOOOOO", geoCode);
        } catch (e) {
          setGeo({ lat: 21.0278, lng: 105.8342 });
        }
      }
    };
    fetchGEO();
  }, [data]);

  let payLoad = {
    customerAddress: currentUser.address || "",
    price: +data.price/100,
    customerEmail: currentUser.email,
    customerName: currentUser.name,
    customerPhone: currentUser.phone,
    productId: +id,
    paymentMethod: "card",
    status: "sucssess",
    title: data.title,
    ownerName : data.user?.name,
    ownerEmail:data.user?.email
  };
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
                  {(data?.detailAddress || "") +
                    ", " +
                    (data?.ward || "") +
                    ", " +
                    (data?.district || "") +
                    ", " +
                    (data?.city || "")}
                </span>
                <span className="hotelPriceHighlight">
                  {data?.title ||
                    "Bán căn hộ Vinhomes Grand Park Quận Hai Bà Trưng"}
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
                        variant="h6"
                        gutterBottom
                      >
                        <b>{"Giá bán: "}</b>  {(data?.price || "2,900,000") + "VNĐ"}
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
                        <b>{"Mô tả: "} </b> {data.description}
                      </Typography>
                      <Divider></Divider>

                      <Typography
                        sx={{
                          padding: "10px 0px",
                        }}
                        variant="h7"
                        gutterBottom
                      >
                        <b>{"Số phòng ngủ: "} </b> {data.numBedRooms}
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
                        <b>{"Số tầng: "}</b> { data.numFloors}
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
                        <b>{"Diện tích: "}</b> { data.squaredMeterArea + " (m2)"}
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
                        <b>{"Chiều dài:  "}</b>  {data.lengthMeter + " (m)"}
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
                        <b>{"Chiều rộng:  "}</b> {data.widthMeter + " (m)"}
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
                       <b> {"Sổ đỏ:  "} </b> 
                          {(data.certificateOfland == 0 ? "Chưa có" : "Đã có")}
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
                      {"Địa chỉ: " +
                        (data?.detailAddress || "") +
                        ", " +
                        (data?.ward || "") +
                        ", " +
                        (data?.district || "") +
                        ", " +
                        (data?.city || "")}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="userAndDeposit">
                <SingleUser user={data?.user}></SingleUser>
                <div className="hotelDetailsPrice">
                  {/* <h1></h1> */}
                  <span>{data.title}</span>
                  <p>{data.description}</p>

                  <p>{"Đặt mua ngôi nhà chỉ với 1 % giá trị :"}</p><span>
                  <h2>
                    <b>
                      {data.price/100 ??
                        Math.floor(Math.random() * (10000 - 1000 + 1) + 1)}{" "}
                      VNĐ
                    </b>
                  </h2>
                  </span>
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
              <div style={{ height: "50vh", width: "80%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAP_KEY,
                  }}
                  defaultCenter={{
                    lat: geo?.lat || 21.0278,
                    lng: geo?.lng || 105.8342,
                  }}
                  defaultZoom={16}
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
          <br></br>
          {/* <MailList /> */}
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};
export default Product;
