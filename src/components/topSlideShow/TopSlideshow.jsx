import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./topSlideshow.css"

export default function TopSlideshow() {
  const buttonStyle = {
    width: "0px",
    background: 'none',
    border: '0px'
};

const properties = {
    prevArrow: <button style={{ ...buttonStyle }}></button>,
    nextArrow: <button style={{ ...buttonStyle }}></button>
}
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const slideImages = [
    {
      url: PF + "slideshow/home1.jpg",
      caption: "Slide 1",
    },
    {
      url: PF + "slideshow/home2.jpg",
      caption: "Slide 2",
    },
    {
      url: PF + "slideshow/home3.jpg",
      caption: "Slide 3",
    },
    {
      url: PF + "slideshow/home4.jpg",
      caption: "Slide 4",
    },
    {
      url: PF + "slideshow/home5.jpg",
      caption: "Slide 5",
    }
  ];
  return (
    <div className="slide-container">
      <Slide {...properties}>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index} style={{}}>
            <div className="topSlideshowContainer">
              <img
                src={slideImage.url}
                alt=""
                style={{
                  height: "400px",
                  width: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
              <span>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
