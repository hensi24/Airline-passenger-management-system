import React from "react";

export const Gallerycardprops = (props) => {
  return (
    <div>
      <div className="img-box">
        <img src={props.image} alt="" />
        <div className="transparent-box">
          <div className="caption">
            <div class="d-flex justify-content-center">
              <div style={{ fontSize: "16px", cursor: "pointer" }}>
                {props.delete}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
