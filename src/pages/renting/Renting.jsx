import Topbar from "../../components/topbar/Topbar";
import TopSlideshow from "../../components/topSlideShow/TopSlideshow"
import * as tf from "@tensorflow/tfjs"
import { genInput } from "./dataInputForm";
import AppButton from "../../components/AppButton/AppButton";
export default function Renting({user}) {
  async function loadModel() {
    const model = await tf.loadLayersModel('./model/model.json');
    return model;
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const slideImages = [
    {
      url: PF + "slideshow/home1.jpg",
      caption: "Slide 1",
    }];
    const handleClick= async ()=>{
          const model = await loadModel();
          console.log("MODELLLLLLLLL",model)
          const xs = tf.tensor2d([genInput()]);
          let response = model.predict(xs);
          console.log("Eqqqqqqqqqqqqq",response);

    }


  return (
    <>
      <Topbar isContainSearch={true}/>
      <TopSlideshow></TopSlideshow>
      {/* <Categories></Categories> */}
      {/* <h3>Tin dành cho bạn:</h3> */}
      {/* <div className="rentingContainer">
        <RentCards></RentCards>
      </div> */}
      <div className="homeContainer">
        {/* <Sidebar /> */}
        {/* <Feed/> */}
        <AppButton text="Clickkkkkkkkkkkkk" onClick={handleClick}></AppButton>
        {/* <Rightbar/> */}
      </div>
    </>
  );
}
