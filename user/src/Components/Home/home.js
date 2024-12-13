import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Gallerycardprops } from "../Gallery/gallerycardprops";
import { Servicecardprops } from "../Service/servicecardprops";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Home = () => {
  // start code for a error page
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);
  // end code for a error page

  const [getdata, setdata] = useState([]);
  const history = useHistory();
  const [getdataaservice, setdataservice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/service/view")
      .then((res) => {
        setdataservice(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getdataaservice]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/gallery/view")
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getdata]);

  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
    });
  };
  return (
    <div>
      <Header />
      {isOnline ? (
        <div>
          <video muted loop autoPlay width="100%" height="100%">
            <source src="video/airport.mp4" type="video/mp4" />
          </video>

          <section className="page-section" id="about">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="section-heading text-uppercase">About</h2>
              </div>
              <ul className="timeline">
                <li>
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="images/airindia.jpg"
                      style={{ height: "157px" }}
                      alt="..."
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>2005</h4>
                      <h4 className="subheading">Air India Express</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Air India Limited is a wholly owned subsidiary of the
                        Tata Group. On the anniversary of the airline's founder
                        J. R. D. Tata's birth, its new headquarters at Vatika
                        One On One in Gurugram was inaugurated. The new
                        headquarters space will be home to all TATA Group
                        airlines.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="images/indigo.jpg"
                      style={{ height: "157px", width: "200px" }}
                      alt="..."
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>2022</h4>
                      <h4 className="subheading">IndiGo</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        IndiGo, is one of the fastest growing global low-cost
                        carriers of today. We commenced operations in August
                        2006 with the objective of not only redefining
                        affordable air travel in India but also to facilitate
                        business trade through our air cargo services.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="images/about.jpg"
                      style={{ height: "157px" }}
                      alt="..."
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>2005</h4>
                      <h4 className="subheading">Akasa Air</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Akasa Air is a relatively new airline in India's
                        domestic aviation sector, having commenced operations in
                        August 2022. Known for its tagline, "It’s Your Sky,"
                        Akasa Air aims to redefine the budget travel experience
                        in India by combining affordability with comfort and
                        sustainability.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <div className="p-5" style={{ backgroundColor: "rgb(241 241 241)" }}>
            <div className="text-center mb-5">
              <h2 className="section-heading text-uppercase">Gallery</h2>
            </div>
            <div className="gallery-image">
              {getdata.slice(0, 3).map((el, index) => {
                return (
                  <Gallerycardprops
                    image={"http://localhost:3000/images/" + el.image}
                  />
                );
              })}
            </div>
          </div>

          <section className="amazing_feature">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center heading-main mb-5">
                  <h2 className="heading">SERVICE</h2>
                </div>
              </div>
              <div className="row  row-cols-1 row-cols-md-3 g-4">
                {getdataaservice.slice(0, 3).map((el, index) => {
                  return (
                    <Servicecardprops
                      image={"http://localhost:3000/images/" + el.image}
                      name={el.name}
                      description={el.description}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          <div className="text-center">
            <h2 className="section-heading text-uppercase">Contact</h2>
          </div>
          <div className="form-wrap mt-5">
            <Formik
              initialValues={{
                name: "",
                email: "",
                mno: "",
                message: "",
              }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const res = await axios.post(
                    "http://localhost:3000/contact/add",
                    values
                  );
                  console.log(res);
                  notify(res.data.status);
                  resetForm();
                } catch (error) {
                  if (error.response) {
                    console.error(
                      "Server responded with status:",
                      error.response.status
                    );
                    console.error("Response data:", error.response.data);
                    notify("Error: " + error.response.data.message, "error");
                  } else if (error.request) {
                    console.error("No response received:", error.request);
                    notify("No response received from server!", "error");
                  } else {
                    console.error(
                      "Error setting up the request:",
                      error.message
                    );
                    notify("Error setting up the request!", "error");
                  }
                }
              }}
            >
              <Form id="survey-form">
                <div className="row  ">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label id="name-label" htmlFor="name">
                        Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label id="mno" htmlFor="mno">
                        Mobile no
                      </label>
                      <Field
                        type="tel"
                        name="mno"
                        id="mno"
                        placeholder="Enter your Mobile no"
                        className="form-control"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label id="email-label" htmlFor="email">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="form-control"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Leave Message</label>
                      <Field
                        as="textarea"
                        id="message"
                        className="form-control"
                        name="message"
                        placeholder="Enter your message here..."
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-dark">
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      ) : (
        <NetworkErrorcompoes />
      )}

      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </div>
  );
};
