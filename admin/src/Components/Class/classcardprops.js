import React from "react";

export const CLasscardprops = (props) => {
  return (
    <tr>
      <th scope="row">{props.counter}</th>
      <td>{props.name}</td>
      <td>{props.update}</td>
      <td>{props.delete}</td>
    </tr>
  );
};
