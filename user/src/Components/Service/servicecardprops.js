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
            <h2 style={{height:"70px"}}>
              <b>{props.name}</b>
            </h2>
            <p style={{ height: "250px", overflow: "hidden" }}>
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
