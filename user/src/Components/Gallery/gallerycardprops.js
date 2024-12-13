import React from "react";

export const Gallerycardprops = (props) => {
  return (
    <div>
      <div className="img-box">
        <img src={props.image} alt="" />
      </div>
    </div>
  );
};
