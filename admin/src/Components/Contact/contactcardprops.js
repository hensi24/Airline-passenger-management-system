import React from "react";

export const Contactcardprops = (props) => {
  return (
    <tr>
      <th scope="row">{props.counter}</th>
      <td>{props.name}</td>
      <td>{props.message}</td>
      <td>{props.email}</td>
      <td>{props.mno}</td>
      <td>{props.delete}</td>
    </tr>
  );
};
