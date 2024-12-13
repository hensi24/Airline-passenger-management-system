import React from "react";

export const Servicecardprops = (props) => {
  return (
    <div>
      <div className="col">
        <div className="single_feature text-center">
          <div>
            <img
              className="rounded-3"
              src={props.image}
              style={{ height: "155px" }}
              alt="..."
            />
          </div>
          <div className="text-center">
            <h2 style={{height:"70px"}}><b>{props.name}</b></h2>
            <p style={{ height: "250px", overflow: "hidden" }}>
              {props.description}
            </p>
          </div>
          <div class="d-flex justify-content-around">
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
