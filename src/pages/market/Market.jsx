import Featured from "../../components/markets/featured/Featured";
import FeaturedProperties from "../../components/markets/featuredProperties/FeaturedProperties";
import Footer from "../../components/markets/footer/MarketFooter";
import Header from "../../components/markets/header/MarketHeader";
import MailList from "../../components/markets/mailList/MailList";
import PropertyList from "../../components/markets/propertyList/PropertyList";
import "./market.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/ProfileRightbar";
import TopSlideshow from "../../components/topSlideShow/TopSlideshow"
import FilterProduct from "../../components/markets/filterDrawer/FilterProduct";
import FilterSidebar from "../../components/markets/filterSidebar/FilterSidebar";
const Market = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Topbar></Topbar>
     
      
      {/* <Header/> */}
      <div className="marketBody">
      <TopSlideshow></TopSlideshow>
      <div className="filterProduct">
        {/* <FilterProduct></FilterProduct> */}

        <FilterSidebar></FilterSidebar>

      </div>
       
      <div className="marketContainer">
        
        {/* <Featured/> */}
        {/* <h1 className="marketTitle">Các loại hình nhả ở</h1>
        <PropertyList/> */}
        <h1 className="marketTitle">Tin mới đăng</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>

      </div>
 
 
    </div>
  );
};

export default Market;
