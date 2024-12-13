import React from "react";

export const Categorycardprops = (props) => {
  return (
    <tr>
      <th scope="row">{props.counter}</th>
      <td>{props.name}</td>
      <td>{props.time}</td>
      <td>{props.update}</td>
      <td>{props.delete}</td>
    </tr>
  );
};
