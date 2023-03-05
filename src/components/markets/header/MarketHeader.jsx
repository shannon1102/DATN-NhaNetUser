import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./marketHeader.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Topbar from "../../topbar/Topbar";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const history = useHistory();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    history.push("/products", { state: { destination, date, options } });
  };
  const handleAddNewProduct  = () => {
    history.push("/market/new", { state: { destination, date, options } });
  };

  return (
    <div className="marketHeader">
      <Topbar isContainSearch={false}></Topbar>
      <div
        className={
          type === "list" ? "marketHeaderContainerListMode" : "marketHeaderContainer"
        }
      >
        {/* <div className="marketHeaderList">
          <div className="marketHeaderListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>NhaNet</span>
          </div>
          <div className="marketHeaderListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="marketHeaderListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="marketHeaderListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="marketHeaderListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div> */}
  
        {type !== "list" && (
          <>
            {/* <h1 className="marketHeaderTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="marketHeaderDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            <button className="marketHeaderBtn">Sign in / Register</button> */}
            <div className="marketHeaderSearch">
              <div className="marketHeaderSearchItem">
                <FontAwesomeIcon icon={faBed} className="marketHeaderIcon" />
                <input
                  type="text"
                  placeholder="Nhập địa điểm"
                  className="marketHeaderSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="marketHeaderSearchItem">
                <FontAwesomeIcon icon={faPerson} className="marketHeaderIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="marketHeaderSearchText"
                >
                  {/* {`Diện tích ${options.adult}  ·  Số phòng ngủ ${options.children}  Giá · ${options.room}`} */}
                
                  {`Diện tích,  Số phòng ngủ ,  Giá ,Số tầng ....`}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Diện tích max</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Diện tích min</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Chiều dài max</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Chiều dài min</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Chiều rộng max</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Chiều rộng min</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                      
                    </div>
                  </div>
                )}
              </div>
              <div className="marketHeaderSearchItem">
                <button className="marketHeaderBtn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
                <button className="marketHeaderBtn" onClick={handleAddNewProduct}>
                  Đăng tin
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
