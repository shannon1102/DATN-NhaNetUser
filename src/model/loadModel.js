import Topbar from "../../components/topbar/Topbar";
import TopSlideshow from "../../components/topSlideShow/TopSlideshow"
import * as tf from "@tensorflow/tfjs"
import { genInput } from "./dataInputForm";

export default async function loadModel() {
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/shannon1102/house-predict-price/master/model.json');
    console.log("Eqqqqqqqqqqqqq",model);
    // console.log(model?.sumary());
    return model;
  }
