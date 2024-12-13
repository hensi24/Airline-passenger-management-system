import React from "react";
import { useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export const Header = () => {
  const history = useHistory();
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "#1d2434",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <header className="header">
          <nav>
            <div className="logo">
              <img
                src="/images/logo.png"
                style={{
                  height: "65px",
                  width: "150px",
                }}
                alt="Logo"
              />
            </div>           
          </nav>
        </header>
      </nav>
    </div>
  );
};
