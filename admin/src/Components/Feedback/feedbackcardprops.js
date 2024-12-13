import React from "react";

export const Feedbackcardprops = (props) => {
  return (
    <tr>
      <th scope="row">{props.counter}</th>
      <td>
        {" "}
        <img
          className="card-img"
          style={{ height: "50px", width: "50px" }}
          src={props.image}
          alt=""
        />
      </td>
      <td>{props.name}</td>
      <td>{props.message}</td>
      <td>{props.profession}</td>
      <td>{props.delete}</td>
    </tr>
  );
};
