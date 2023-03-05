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

const Product = () => {
  const baseURL = `${process.env.REACT_APP_BASE_URL}`
  

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

  const { dates, options } = useContext(SearchContext);


  
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [mediaLength, setMediaLength] = useState(0);

  const { data, loading, error } = useFetch(`${baseURL}/products/${id}`);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = 12;
 
  //  dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      console.log("MediaLength",mediaLength)
      newSlideNumber = slideNumber === 0 ? (mediaLength -  1) : slideNumber - 1;
    } else {
      console.log("MediaLength",mediaLength)
      newSlideNumber = slideNumber === (mediaLength - 1) ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (currentUser) {
      setOpenModal(true);
      setMediaLength(data.media?.length)
    } else {
      history.push("/login");
    }
  };

  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  return (
    <div>
      {/* <Navbar /> */}
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)
                }
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={process.env.REACT_APP_MEDIA_URL + "/" + data.media[slideNumber].id}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            {/* <Link to={`/messenger/${data.user.id}`}> */}
            
                {/* <button className="bookNow">Nhắn tin</button> */}
            {/* </Link> */}
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Địa chỉ:  – {data.distance}
            </span>
            <span className="hotelPriceHighlight">
                Bán căn hộ Vinhomes Grand Park Quận Hai Bà Trưng
            </span>
            <div className="productContainer">
            <div className="hotelImages">
              {data.media?.map((item, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                   src={process.env.REACT_APP_MEDIA_URL + "/" + item.id}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div>
                <SingleUser></SingleUser>

            </div>
            </div>
            
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                {/* <h1></h1> */}
                <span>
                    Căn hộ siêu đẹp cạnh siêu thị Lotter, Nguyễn Tất Thành
                </span>
                <h2>
                  <b>{ data.price ?? 100000000} VNĐ</b> ({days}{" "}
                  )
                </h2>
                <button onClick={handleClick}>Đặt cọc ngay</button>
              </div>
            </div>
          </div>
          <iframe
                class="gmapIframeProductDtail"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=1200&amp;height=800&amp;hl=en&amp;q=Hà Nội&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
          <br></br>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};
export default Product;