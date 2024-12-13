import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Footer = () => {
  const history = useHistory();
  return (
    <div>
      <>
        
      </>

      <>
      {/* Footer Start */}
      <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <div className="footer-blog">
                  <h3>Wonder Wise</h3>
                  <img
                    src="images/about.jpg"
                    className="rounded-pill"
                    style={{ height: "190px", width: "200px" }}
                    alt="Image"
                  />
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="footer-insta">
                  <h3>Gallery</h3>
                  <a>
                    <img src="images/canteen.jpg" alt="Image" />
                  </a>
                  <a>
                    <img src="images/gallery.jpg" alt="Image" />
                  </a>
                  <a>
                    <img src="images/service.jpg" alt="Image" />
                  </a>
                  <a>
                    <img src="images/airindia.jpg" alt="Image" />
                  </a>
                  <a>
                    <img src="images/gallery1.jpg" alt="Image" />
                  </a>
                  <a>
                    <img src="images/routes.jpg" alt="Image" />
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="footer-tags">
                  <h3>More Pages</h3>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/home")}
                  >
                    Home
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/gallery")}
                  >
                    Gallery
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/airlinesroute")}
                  >
                    Route
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/service")}
                  >
                    Service
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/canteen")}
                  >
                    Canteen
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/Feedback")}
                  >
                    Feedback
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="footer-newsletter text-white">
                  <h3>About the airlines</h3>
                  <p>
                    An airline is a company that transports people and items using
                    airliners. An airline may have as few as one airplane or a fleet
                    of hundreds of airplanes.

                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="footer-contact">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <h4>Contact-us</h4>
                  <p>+123 456 7890</p>
                </div>
                <div className="col-md-3">
                  <h4>E-mail</h4>
                  <p>wonderwise123@gmail.com</p>
                </div>
                <div className="col-md-3">
                  <h4>Hours</h4>
                  <p>24/7 avaliable</p>
                </div>
                <div className="col-md-3">
                  <h4>Get in Touch</h4>
                  <a href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="">
                    <i className="fab fa-youtube" />
                  </a>
                  <a href="">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}

      </>
    </div>
  );
};