import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaHome } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { RiPassValidFill } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";
import { MdMiscellaneousServices } from "react-icons/md";
import { FcFeedback } from "react-icons/fc";
import { MdContactPhone } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export const Sidebar = (props) => {
  const [getvalue, setvalue] = useState(true);
  const history = useHistory();

  return (
    <div>
      <div className="sidebar" style={{ width: getvalue ? "15%" : "4%" }}>
        <div
          className="logo-details data"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div>
            <i
              onClick={() => {
                setvalue(false);
              }}
              style={{ display: getvalue ? "block" : "none" }}
              id="btn"
            >
              <IoClose />
            </i>
          </div>
          <div
            className="logo-details"
            style={{ display: "flex", justifyContent: "right" }}
          >
            <i
              onClick={() => {
                setvalue(true);
              }}
              style={{
                display: getvalue ? "none" : "block",
                cursor: "pointer",
              }}
            >
              <TiThMenu />
            </i>
          </div>
        </div>

        <ul className="nav-list" style={{ flex: 1 }}>
          <li>
            <li onClick={() => history.push("/home")}>
              <i>
                <FaHome />
              </i>
              <span className="links_name">Home</span>
            </li>
            <span className="tooltip">Home</span>
          </li>

          <li>
            <li onClick={() => history.push("/gallery")}>
              <i>
                <RiGalleryFill />
              </i>{" "}
              <span className="links_name">Gallery</span>
            </li>
            <span className="tooltip">Gallery</span>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              style={{ paddingTop: "0px", paddingLeft: "15px" }}
              href="#"
              // id="navbarDarkDropdownMenuLink"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i>
                <RiPassValidFill />
              </i>
              <span className="links_name" style={{ paddingLeft: "35px" }}>
                Pass
              </span>
            </a>
            <ul
              className="dropdown-menu change-dropdown-menu"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => history.push("/airlines")}
                >
                  Airlines
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => history.push("/routes")}
                >
                  Routes
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => history.push("/class")}
                >
                  Class
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => history.push("/booking")}
                >
                  Booking
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              style={{ paddingTop: "0px", paddingLeft: "15px" }}
              href="#"
              // id="navbarDarkDropdownMenuLink"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i>
                <IoFastFood />
              </i>
              <span className="links_name" style={{ paddingLeft: "35px" }}>
                Canteen
              </span>
            </a>
            <ul
              className="dropdown-menu change-dropdown-menu"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => history.push("/canteen")}
                >
                  Category
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => history.push("/menu")}
                >
                  Menu
                </a>
              </li>
            </ul>
          </li>

          <li>
            <li onClick={() => history.push("/service")}>
              <i>
                <MdMiscellaneousServices />
              </i>
              <span className="links_name">Service</span>
            </li>
            <span className="tooltip">Service</span>
          </li>

          <li>
            <li onClick={() => history.push("/feedback")}>
              <i>
                <FcFeedback />
              </i>{" "}
              <span className="links_name">Feedback</span>
            </li>
            <span className="tooltip">Feedback</span>
          </li>

          <li>
            <li onClick={() => history.push("/contact")}>
              <i>
                <MdContactPhone />
              </i>{" "}
              <span className="links_name">Contact</span>
            </li>
            <span className="tooltip">Contact</span>
          </li>
        </ul>

        <div
          className="logout"
          style={{ position: "absolute", bottom: 0, width: "100%" }}
        >
          <li>
            <li
              className=" cursor: pointer"
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={() => history.push("/Profile")}
            >
              <i>
                <FaUserCircle />
              </i>
              <span className="links_name">Profile</span>
            </li>
          </li>
          <li>
            <li onClick={() => history.push("/")}>
              <i>
                <IoLogOut />
              </i>{" "}
              <span className="links_name">Logout</span>
            </li>
            <span className="tooltip">Logout</span>
          </li>
        </div>
      </div>

      <div className="main-part" style={{ width: getvalue ? "85%" : "96%" }}>
        <div className="main">
          {props.home}
          {props.gallery}
          {props.airlines}
          {props.routes}
          {props.class}
          {props.booking}
          {props.canteen}
          {props.menu}
          {props.service}
          {props.feedback}
          {props.contact}
          {props.profile}
        </div>
      </div>
    </div>
  );
};
