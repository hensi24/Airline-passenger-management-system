import React from "react";

export const Menucardprops = (props) => {
  return (
    <div>
      <div className="single_menu">
        <img src={props.image} alt="burger" />
        <div className="menu_content">
          <h4>
            <b>{props.foodname} </b>| {props.name}  <span>{props.price}₹ </span>
          </h4>
          <p style={{ height: "100px", overflow: "hidden" }}>
          {props.description}
          </p>
        </div>
        <div class="d-flex justify-content-end pe-5">
          <div className="d-flex justify-content-evenly">
            <div style={{ fontSize: "16px", cursor: "pointer" }}>
              {props.update}
            </div>
            <div style={{ fontSize: "16px", cursor: "pointer" }}>
              {props.delete}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
