import React from "react";
import "./category.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Category({name}) {
  return (
    <div className="categoryWrapper">
      {/* <div className="category__img"> */}

      <img className="category__img"
                src={PF + "slideshow/home1.jpg"}
                alt=""
                style={{
                  height: "100px",
                  width: "100px",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
      {/* </div> */}
      
      <span><p className="category__name">{name}</p></span>
    </div>
  );
}
