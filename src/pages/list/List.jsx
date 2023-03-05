import "./list.css";

import Header from "../../components/markets/header/MarketHeader";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/markets/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar";

const List = () => {
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
  console.log("location.state", location.state);
  const [destination, setDestination] = useState(
    location.state.state.destination
  );
  // const [dates, setDates] = useState(location.state.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    // `${baseURL}/products&min=${min || 0 }&max=${max || 999}`
    `${baseURL}/products`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      {/* <Header type="list" /> */}
      <Topbar></Topbar>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Tìm kiếm</h1>
            <div className="lsItem">
              <label>Địa chỉ</label>
              <input placeholder={destination} type="text" />
            </div>
            {/* <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div> */}
            <div className="lsItem">
              <label>Bộ lọc</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Mặt đường :</span>
                  <span className="lsOptionText">Có</span>
                  <input
                    type="radio"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                  <span className="lsOptionText">Không</span>
                  <input
                    type="radio"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price</span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Số phòng ngủ từ:</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options?.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Số phòng ngủ đến:</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Số tầng từ :</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Số tầng dến :</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Giá từ :</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Giá đến:</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Diện tích từ:</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Diện tích đến:</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
