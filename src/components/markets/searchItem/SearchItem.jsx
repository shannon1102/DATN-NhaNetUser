import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img  src={process.env.REACT_APP_MEDIA_URL + "/" +item.featureImage.id} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siDistance">{item.description}</span>
        <span className="siTaxiOp">Địa chỉ: Quận Đống Đa, Hà Nội</span>
        <span className="siSubtitle">
          Diện tích : {item.area}
        </span>
        <span className="siSubtitle">
          Chiều dài : {item.area}
        </span>
        <span className="siSubtitle">
          Chiều rộng : {item.area}
        </span>
        <span className="siSubtitle">
          Số tầng: {item.area}
        </span>
        <span className="siSubtitle">
          Số phòng ngủ : {item.area}
        </span>
        <span className="siCancelOp">Có đặt cọc online </span>
        <span className="siCancelOpSubtitle">
          Mời các bạn qua đây
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item.price} VNĐ</span>
          <span className="siTaxOp">Cọc giá cả thương lượng</span>
          <Link to={`/products/${item.id}`}>
            <button className="siCheckButton">Xem chi tiết</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
