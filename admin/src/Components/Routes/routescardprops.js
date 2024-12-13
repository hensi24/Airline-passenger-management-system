import React from "react";

export const Routescardprops = (props) => {
  return (
    <tr>
      <th scope="row">{props.counter}</th>
      <td>{props.origin}</td>
      <td>{props.destination}</td>
      <td>{props.name}</td>
      <td>{props.no}</td>
      <td>{props.takeoftime}</td>
      <td>{props.date}</td>
      <td>{props.price} ₹</td>
      <td>{props.update}</td>
      <td>{props.delete}</td>
    </tr>
  );
};
