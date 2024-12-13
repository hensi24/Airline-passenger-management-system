import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import moment from "moment";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";

export const Book = () => {
  const { cat } = useParams();
  const componentPDF = useRef(null);

  const [name, setname] = useState("");
  const [no, setno] = useState("");
  const [origin, setorigin] = useState("");
  const [destination, setdestination] = useState("");
  const [takeoftime, settakeoftime] = useState("");
  const [date, setdate] = useState("");
  const [price, setprice] = useState("");
  const [categories, setCategories] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/booking/viewcategoryclass"
        );
        const data = response.data.data;
        setCategories(data.map((airlinesclass) => airlinesclass.name));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (cat) {
      try {
        const { name, no, origin, destination, takeoftime, date, price } =
          JSON.parse(decodeURIComponent(cat));
        setname(name);
        setno(no);
        setorigin(origin);
        setdestination(destination);
        settakeoftime(takeoftime);
        setdate(date);
        setprice(price);
      } catch (error) {
        console.error("Error parsing params: ", error);
      }
    }
  }, [cat]);

  const getCurrentDate1 = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const genratePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "bookingdata",
  });

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
      <div className="p-5">
        <div className="text-center ">
          <h2 className="section-heading text-uppercase">
            {origin} to {destination} at {moment(date).format("YYYY/MM/DD")}
          </h2>
        </div>
      </div>

      <div className="row mx-3 mb-5" style={{ margintop: 25 }}>
        <div className="col-md-12 justify-content-center">
          <Formik
            initialValues={{
              name: "",
              email: "",
              mno: "",
              gender: "",
              birthdate: "",
              origin: origin,
              destination: destination,
              price: price,
              seat: "",
              aclass: "",
              rdate: getCurrentDate(),
              pno: no,
              pname: name,
              takeoftime: takeoftime,
              date: moment(date).format("YYYY-MM-DD"),
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await axios.post(
                  "http://localhost:3000/booking/add",
                  {
                    ...values,
                    origin: origin,
                    destination: destination,
                    price: price,
                    pname: name,
                    pno: no,
                    takeoftime: takeoftime,
                    date: date,
                  }
                );
                console.log(res);
                notify(res.data.status);
                setSubmittedData(res.data.data);
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
                  console.error("Error setting up the request:", error.message);
                  notify("Error setting up the request!", "error");
                }
              }
            }}
          >
            {({ setFieldValue, handleChange, values, errors }) => (
              <div className="card pb-0">
                <div className="card-body m-5 mx-5">
                  <Form>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            {" "}
                            <label>Name :</label>
                          </b>
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            className="form-control text-black"
                            placeholder="Enter Your Name"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            {" "}
                            <label>Email :</label>
                          </b>

                          <Field
                            name="email"
                            id="email"
                            type="text"
                            className="form-control text-black"
                            placeholder="Enter Your Email id"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            {" "}
                            <label>Mobile No :</label>
                          </b>

                          <Field
                            type="tel"
                            name="mno"
                            id="mno"
                            className="form-control text-black"
                            placeholder="Enter Your Mobile no"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            {" "}
                            <label>Gender :</label>
                          </b>
                          <div className="row">
                            <div className="col"></div>
                            <div className="col">
                              <div className="form-check">
                                <Field
                                  type="radio"
                                  name="gender"
                                  id="male"
                                  value="male"
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor="male"
                                  className="form-check-label"
                                >
                                  Male
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <Field
                                  type="radio"
                                  name="gender"
                                  id="female"
                                  value="female"
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor="female"
                                  className="form-check-label"
                                >
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            <label>Birthdate :</label>
                          </b>
                          <Field
                            type="date"
                            name="birthdate"
                            className="form-control"
                            required
                            placeholder="birthdate"
                            max={getCurrentDate1()}
                            onChange={(e) => {
                              setFieldValue("birthdate", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            {" "}
                            <label>Seat No :</label>
                          </b>
                          {/* <Field
                            type="text"
                            name="seat"
                            id="seat"
                            className="form-control text-black"
                            placeholder="Enter Your Seat no"
                          /> */}
                          <Field
                            type="number"
                            name="seat"
                            id="seat"
                            className="form-control text-black"
                            placeholder="Enter Your Seat no"
                            min="1"
                            max="30"
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10);
                              if (value >= 1 && value <= 30) {
                                setFieldValue("seat", value);
                              } else {
                                notify(
                                  "Seat number must be between 1 and 30",
                                  "error"
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            {" "}
                            <label>Class :</label>
                          </b>
                          <Field
                            as="select"
                            name="aclass"
                            className={`form-control ${
                              errors.aclass ? "is-invalid" : ""
                            }`}
                            value={values.aclass}
                            onChange={handleChange}
                          >
                            <option value="">Select Category</option>
                            {categories.map((name, index) => (
                              <option key={index} value={name}>
                                {name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            <label>Origin :</label>
                          </b>

                          <Field
                            type="text"
                            name="origin"
                            id="origin"
                            className="form-control text-black"
                            value={origin}
                            placeholder="Enter Your Origin"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            <label>Destination :</label>
                          </b>

                          <Field
                            type="text"
                            name="destination"
                            id="destination"
                            value={destination}
                            className="form-control text-black"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            <label>Price :</label>
                          </b>
                          <Field
                            type="text"
                            name="price"
                            id="price"
                            className="form-control text-black"
                            value={price}
                            placeholder="Enter Price"
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="form-outline">
                          <b>
                            {" "}
                            <label>Register Date :</label>
                          </b>{" "}
                          <Field
                            type="date"
                            name="rdate"
                            id="rdate"
                            className="form-control text-black"
                            placeholder="Enter Your Register Date"
                            min={getCurrentDate()}
                            value={values.rdate}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            <label>Airline Name :</label>
                          </b>

                          <Field
                            type="text"
                            name="pno"
                            id="pno"
                            value={no}
                            readOnly
                            className="form-control text-black"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            <label>Airline No :</label>
                          </b>

                          <Field
                            type="text"
                            name="pname"
                            id="pname"
                            value={name}
                            readOnly
                            className="form-control text-black"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            <label>Take of time :</label>
                          </b>

                          <Field
                            type="time"
                            name="takeoftime"
                            id="takeoftime"
                            value={takeoftime}
                            readOnly
                            className="form-control text-black"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <b>
                            {" "}
                            <label>Date :</label>
                          </b>
                          <Field
                            type="date"
                            name="date"
                            id="date"
                            value={moment(date).format("YYYY-MM-DD")}
                            readOnly
                            className="form-control text-black"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 d-flex justify-content-center">
                      <button className="btn btn-dark" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>

      {submittedData && (
        <div>
          <div
            className="container d-flex justify-content-center mb-5 "
            ref={componentPDF}
          >
            <div className="boarding-pass">
              <header>
                <div className="logo">{submittedData.pname}</div>
                <div className="flight">
                  <small>flight</small>
                  <strong>{submittedData.pno}</strong>
                </div>
              </header>
              <section className="cities">
                <div className="city">
                  <small>{submittedData.origin}</small>
                  <strong>{submittedData.origin.substring(0, 3)}</strong>
                </div>
                <div className="city">
                  <small>{submittedData.destination}</small>
                  <strong>{submittedData.destination.substring(0, 3)}</strong>
                </div>
                <svg className="airplane">
                  <use xlinkHref="#airplane" />
                </svg>
              </section>
              <section className="infos">
                <div className="places">
                  <div className="box">
                    <small>Take of time</small>
                    <strong>
                      <em>{submittedData.takeoftime}</em>
                    </strong>
                  </div>
                  <div className="box">
                    <small>Seat</small>
                    <strong>{submittedData.seat}</strong>
                  </div>
                  <div className="box">
                    <small>Origin</small>
                    <strong>{submittedData.origin}</strong>
                  </div>{" "}
                  <div className="box">
                    <small>Destination</small>
                    <strong>{submittedData.destination}</strong>
                  </div>
                </div>
                <div className="times">
                  <div className="box">
                    <small>Gender</small>
                    <strong>{submittedData.gender}</strong>
                  </div>
                  <div className="box">
                    <small>CLass</small>
                    <strong>{submittedData.aclass}</strong>
                  </div>
                  <div className="box">
                    <small>Airlines Name</small>
                    <strong>{submittedData.pname}</strong>
                  </div>
                  <div className="box">
                    <small>Airlines no</small>
                    <strong>{submittedData.pno}</strong>
                  </div>
                </div>
              </section>
              <section className="strap">
                <div className="box">
                  <div className="passenger">
                    <small>passenger</small>
                    <strong>{submittedData.name}</strong>
                  </div>
                  <div className="date">
                    <small>Date</small>
                    <strong>
                      {format(new Date(submittedData.date), "yyyy-MM-dd")}
                    </strong>
                  </div>
                </div>
                <svg className="qrcode">
                  <use xlinkHref="#qrcode" />
                </svg>
              </section>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={0}
              height={0}
              display="none"
            >
              <symbol id="qrcode" viewBox="0 0 130 130">
                <g>
                  <path
                    fill="#334158"
                    d="M123,3h-5h-5h-5h-5h-5h-5v5v5v5v5v5v5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5V8V3H123z M123,13v5v5v5v5h-5h-5h-5
		h-5h-5v-5v-5v-5v-5V8h5h5h5h5h5V13z"
                  />
                  <polygon
                    fill="#334158"
                    points="88,13 88,8 88,3 83,3 78,3 78,8 78,13 83,13 	"
                  />
                  <polygon
                    fill="#334158"
                    points="63,13 68,13 73,13 73,8 73,3 68,3 68,8 63,8 58,8 58,13 53,13 53,8 53,3 48,3 48,8 43,8 43,13 
		48,13 48,18 43,18 43,23 48,23 53,23 53,18 58,18 58,23 63,23 63,18 	"
                  />
                  <polygon
                    fill="#334158"
                    points="108,13 103,13 103,18 103,23 103,28 108,28 113,28 118,28 118,23 118,18 118,13 113,13 	"
                  />
                  <polygon
                    fill="#334158"
                    points="78,18 73,18 73,23 78,23 83,23 83,18 	"
                  />
                  <polygon
                    fill="#334158"
                    points="23,28 28,28 28,23 28,18 28,13 23,13 18,13 13,13 13,18 13,23 13,28 18,28 	"
                  />
                  <polygon
                    fill="#334158"
                    points="53,28 53,33 53,38 58,38 58,33 58,28 58,23 53,23 	"
                  />
                  <rect x={63} y={23} fill="#334158" width={5} height={5} />
                  <rect x={68} y={28} fill="#334158" width={5} height={5} />
                  <path
                    fill="#334158"
                    d="M13,38h5h5h5h5h5v-5v-5v-5v-5v-5V8V3h-5h-5h-5h-5h-5H8H3v5v5v5v5v5v5v5h5H13z M8,28v-5v-5v-5V8h5h5h5h5h5v5
		v5v5v5v5h-5h-5h-5h-5H8V28z"
                  />
                  <polygon
                    fill="#334158"
                    points="48,33 48,28 43,28 43,33 43,38 48,38 	"
                  />
                  <polygon
                    fill="#334158"
                    points="83,38 88,38 88,33 88,28 88,23 83,23 83,28 78,28 78,33 83,33 	"
                  />
                  <polygon
                    fill="#334158"
                    points="23,43 18,43 13,43 8,43 3,43 3,48 8,48 13,48 18,48 23,48 28,48 28,43 	"
                  />
                  <rect x={108} y={43} fill="#334158" width={5} height={5} />
                  <rect x={28} y={48} fill="#334158" width={5} height={5} />
                  <polygon
                    fill="#334158"
                    points="88,53 93,53 93,48 93,43 88,43 88,48 83,48 83,53 	"
                  />
                  <polygon
                    fill="#334158"
                    points="123,48 123,43 118,43 118,48 118,53 118,58 123,58 123,63 118,63 113,63 113,68 118,68 118,73 
		118,78 123,78 123,83 128,83 128,78 128,73 123,73 123,68 128,68 128,63 128,58 128,53 123,53 	"
                  />
                  <polygon
                    fill="#334158"
                    points="98,58 98,63 103,63 103,68 108,68 108,63 108,58 103,58 103,53 103,48 103,43 98,43 98,48 98,53 
		93,53 93,58 	"
                  />
                  <rect x={108} y={53} fill="#334158" width={5} height={5} />
                  <rect x={78} y={63} fill="#334158" width={5} height={5} />
                  <rect x={93} y={63} fill="#334158" width={5} height={5} />
                  <rect x={53} y={68} fill="#334158" width={5} height={5} />
                  <polygon
                    fill="#334158"
                    points="108,73 108,78 108,83 113,83 113,78 113,73 113,68 108,68 	"
                  />
                  <rect x={13} y={73} fill="#334158" width={5} height={5} />
                  <rect x={98} y={73} fill="#334158" width={5} height={5} />
                  <polygon
                    fill="#334158"
                    points="18,83 18,88 23,88 28,88 28,83 23,83 23,78 18,78 	"
                  />
                  <polygon
                    fill="#334158"
                    points="8,83 8,78 8,73 8,68 13,68 13,63 13,58 13,53 8,53 3,53 3,58 3,63 3,68 3,73 3,78 3,83 3,88 8,88 	
		"
                  />
                  <rect x={53} y={83} fill="#334158" width={5} height={5} />
                  <rect x={73} y={83} fill="#334158" width={5} height={5} />
                  <path
                    fill="#334158"
                    d="M108,88v-5h-5h-5h-5h-5v-5h5v-5h-5v-5h-5v5h-5h-5v-5h-5h-5v5h5v5h-5v5v5h5v-5h5v-5h5h5v5v5h-5v5h5v5h-5h-5
		v5h5v5h5v5v5h-5v5h5h5h5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5v-5v-5h-5h-5v-5v-5h-5v5H108z M98,118h-5v-5h5V118z M98,103h-5h-5v-5v-5v-5
		h5h5h5v5v5v5H98z M123,118v5h-5h-5v-5h-5h-5v-5h5v-5h5v5v5h5v-5h5V118z M118,98h5v5h-5h-5v-5H118z"
                  />
                  <path
                    fill="#334158"
                    d="M28,93h-5h-5h-5H8H3v5v5v5v5v5v5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5v-5v-5h-5H28z M33,103v5v5v5v5h-5h-5h-5h-5
		H8v-5v-5v-5v-5v-5h5h5h5h5h5V103z"
                  />
                  <rect x={93} y={93} fill="#334158" width={5} height={5} />
                  <polygon
                    fill="#334158"
                    points="63,98 68,98 68,93 63,93 58,93 53,93 53,88 48,88 48,83 43,83 43,78 48,78 48,73 43,73 43,68 
		48,68 53,68 53,63 58,63 58,68 63,68 63,63 63,58 68,58 73,58 73,63 78,63 78,58 83,58 83,53 78,53 78,48 83,48 83,43 83,38 78,38 
		78,33 73,33 73,38 73,43 68,43 68,38 68,33 63,33 63,38 63,43 63,48 68,48 73,48 73,53 68,53 63,53 58,53 58,58 53,58 53,53 53,48 
		58,48 58,43 53,43 48,43 43,43 38,43 33,43 33,48 38,48 38,53 33,53 33,58 38,58 43,58 43,63 38,63 33,63 33,68 38,68 38,73 33,73 
		28,73 28,68 28,63 33,63 33,58 28,58 23,58 18,58 18,63 23,63 23,68 18,68 18,73 23,73 23,78 28,78 33,78 38,78 38,83 33,83 33,88 
		38,88 43,88 43,93 43,98 48,98 48,103 53,103 53,98 58,98 58,103 58,108 63,108 63,103 	"
                  />
                  <polygon
                    fill="#334158"
                    points="18,103 13,103 13,108 13,113 13,118 18,118 23,118 28,118 28,113 28,108 28,103 23,103 	"
                  />
                  <polygon
                    fill="#334158"
                    points="48,108 48,103 43,103 43,108 43,113 43,118 43,123 43,128 48,128 53,128 53,123 48,123 48,118 
		48,113 53,113 58,113 58,108 53,108 	"
                  />
                  <polygon
                    fill="#334158"
                    points="78,118 78,113 78,108 73,108 68,108 63,108 63,113 68,113 68,118 63,118 63,123 63,128 68,128 
		68,123 73,123 73,118 	"
                  />
                  <rect x={73} y={123} fill="#334158" width={5} height={5} />
                </g>
              </symbol>
            </svg>
          </div>

          <div className="text-center wow fadeInUp m-5" data-wow-delay="0.1s">
            <button type="button" onClick={genratePDF} className="btn btn-dark">
              Convert To PDF
            </button>
          </div>
        </div>
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
