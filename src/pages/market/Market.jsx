import Featured from "../../components/markets/featured/Featured";
import FeaturedProperties from "../../components/markets/featuredProperties/FeaturedProperties";
import Footer from "../../components/markets/footer/MarketFooter";
import Header from "../../components/markets/header/MarketHeader";
import MailList from "../../components/markets/mailList/MailList";
import PropertyList from "../../components/markets/propertyList/PropertyList";
import "./market.css";
import Topbar from "../../components/topbar/Topbar";
import TopSlideshow from "../../components/topSlideShow/TopSlideshow";
import FilterSidebar from "../../components/markets/filterSidebar/FilterSidebar";
const Market = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Topbar isContainSearch={true}></Topbar>

      {/* <Header/> */}
      <TopSlideshow></TopSlideshow>
      <div className="marketBody">
       
        <div className="filterProduct">
          <FilterSidebar></FilterSidebar>
        </div>

        <div className="marketContainer">
          {/* <h1 className="marketTitle">Tin mới đăng</h1> */}
          <FeaturedProperties />
          <MailList />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Market;
