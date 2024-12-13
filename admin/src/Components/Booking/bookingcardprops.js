import React from "react";

export const Bookingcardprops = (props) => {
  return (
    <tr>
      <th scope="row">{props.counter}</th>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.mno}</td>
      <td>{props.gender}</td>
      <td>{props.birthdate}</td>
      <td>{props.origin}</td>
      <td>{props.destination}</td>
      <td>{props.seat}</td>
      <td>{props.aclass}</td>
      <td>{props.rdate}</td>
      <td>{props.pno}</td>
      <td>{props.pname}</td>
      <td>{props.takeoftime}</td>
      <td>{props.date}</td>
      <td>{props.price} ₹</td>
      <td>{props.delete}</td>
    </tr>
  );
};
