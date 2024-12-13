import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Footer = () => {
  const history = useHistory();
  return (
    <div>
      <>
        <footer className="footer-distributed">
          <div className="footer-left">
            <h3>Airport Management System</h3>
            <p className="footer-links">
              <a href="#" onClick={() => history.push("/")} className="link-1">
                Home
              </a>
              <a href="#" onClick={() => history.push("/gallery")}>
                Gallery
              </a>
              <a href="#" onClick={() => history.push("/booking")}>
                Booking
              </a>
              <a href="#" onClick={() => history.push("/service")}>
                Service
              </a>
              <a href="#" onClick={() => history.push("/feedback")}>
                Feedback
              </a>
              <a href="#" onClick={() => history.push("/login")}>
                Login
              </a>
            </p>
          </div>
          <div className="footer-center">
            <div>
              <i className="fa fa-map-marker" />
              <p>
                <span>VIP Road</span> Surat
              </p>
            </div>
            <div>
              <i className="fa fa-phone" />
              <p>9890564321</p>
            </div>
            <div>
              <i className="fa fa-envelope" />
              <p>
                <a href="">airmanagement@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="footer-right">
            <p className="footer-company-about">
              <span>About the airlines</span>
              An airline is a company that transports people and items using
              airliners. An airline may have as few as one airplane or a fleet
              of hundreds of airplanes.
            </p>
            <div className="footer-icons">
              <a href="#">
                <i className="fab fa-facebook" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-linkedin" />
              </a>
              <a href="#">
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
        </footer>
      </>
    </div>
  );
};
