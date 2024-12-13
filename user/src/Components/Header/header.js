import React from "react";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const history = useHistory();
  return (
    <div>
      <header className="header">
        <nav>
          <div className="logo">
            {/* <a href="index.html">Airport Management System</a> */}
            <img
                    src="/images/logo.png"
                    style={{
                      height: "65px",
                      width: "150px",
                    }}
                    alt="Logo"
                  />
          </div>
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="menu-icon">
            ☰
          </label>
          <ul className="menu">
            <li>
              <a href="#" onClick={() => history.push("/")}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/gallery")}>
                Gallery
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/airlinesroute")}>
                Route
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/service")}>
                Service
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/canteen")}>
                Canteen
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/feedback")}>
                Feedback
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/profile")}>
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
