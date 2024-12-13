import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Protector = (props) => {
  const history = useHistory();
  const [gettoken, settoken] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("usertoken");
    if (!token) {
      return history.push("/login");
    }
    settoken(token);
  });
  if (!gettoken) {
    return <p>....loader</p>;
  }
  return props.children;
};
