import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik } from "formik";
import { Routescardprops } from "./routescardprops";
import moment from "moment";
import { Sidebar } from "../sidebar";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Routes = () => {
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

  const gujaratCities = [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Junagadh",
    "Anand",
    "Jamnagar",
    "Kesod",
    "Nadiad",
    "Bhuj",
    "Kandla",
    "Porbander",
  ];

  const [getdata, setdata] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [nameToNumberMap, setNameToNumberMap] = useState({});

  const togglePopup1 = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/airlineroute/view")
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getdata]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/airlineroute/viewcategory"
        );
        const data = response.data.data;
        const nameToNumber = {};
        data.forEach((airline) => {
          nameToNumber[airline.name] = airline.no;
        });
        setCategories(data.map((airline) => airline.name));
        setNumbers(data.map((airline) => airline.no));
        setNameToNumberMap(nameToNumber);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const delhandel = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:3000/airlineroute/delete/${e}`)
      .then((res) => {
        notify(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [getdata1, setdata1] = useState({
    origin: "",
    destination: "",
    name: "",
    no: "",
    takeoftime: "",
    date: getCurrentDate(),
    price: "",
  });
  const [getempid, setempid] = useState();

  const togglePopup = (e) => {
    setempid(e);
    console.log(getdata1);

    setShowPopup(!showPopup);
    axios
      .get(`http://localhost:3000/airlineroute/show/${e}`)
      .then((res) => {
        setdata1({
          origin: res.data.data.origin,
          destination: res.data.data.destination,
          name: res.data.data.name,
          no: res.data.data.no,
          takeoftime: res.data.data.takeoftime,
          date: moment(res.data.data.date).format("YYYY-MM-DD"),
          price: res.data.data.price,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  return (
    <div>
      {isOnline ? (
        <Sidebar
          routes={
            <>
              <Header />

              <div className="p-5">
                <div className="container-fluid py-5">
                  <div className="container text-center">
                    <h1
                      className="text-dark text-uppercase position-relative lines"
                      style={{ marginTop: "80px" }}
                    >
                      <span className="line"></span>
                      Routes
                      <span className="line"></span>
                    </h1>
                  </div>
                </div>

                <div className="text-end">
                  <a>
                    <i
                      onClick={togglePopup1}
                      style={{
                        fontSize: "200%",
                        color: "black",
                        cursor: "pointer",
                      }}
                    >
                      <RiUploadCloud2Fill />
                    </i>
                  </a>
                </div>
              </div>

              <div>
                {showPopup && (
                  <>
                    <div className="container-fluid" style={{ padding: "0px" }}>
                      <div className=" popup">
                        <div className="popup-inner">
                          <div className="d-flex justify-content-md-end">
                            <a onClick={() => setShowPopup(false)}>
                              <i style={{ fontSize: "150%", color: "black" }}>
                                <IoClose />
                              </i>
                            </a>
                          </div>
                          <Formik
                            initialValues={getdata1}
                            enableReinitialize={true}
                            onSubmit={async (values) => {
                              if (getempid) {
                                axios
                                  .put(
                                    `http://localhost:3000/airlineroute/update/${getempid}`,
                                    values
                                  )
                                  .then((res) => {
                                    console.log(res);
                                    setShowPopup(false);
                                    notify(res.data.status);
                                  })
                                  .catch((error) => {
                                    if (error.response) {
                                      console.error(
                                        "Server responded with status:",
                                        error.response.status
                                      );
                                      console.error(
                                        "Response data:",
                                        error.response.data
                                      );
                                      notify(
                                        "Error: " + error.response.data.message,
                                        "error"
                                      );
                                    } else if (error.request) {
                                      console.error(
                                        "No response received:",
                                        error.request
                                      );
                                      notify(
                                        "No response received from server!",
                                        "error"
                                      );
                                    } else {
                                      console.error(
                                        "Error setting up the request:",
                                        error.message
                                      );
                                      notify(
                                        "Error setting up the request!",
                                        "error"
                                      );
                                    }
                                  });
                              } else {
                                axios
                                  .post(
                                    "http://localhost:3000/airlineroute/add",
                                    values
                                  )
                                  .then((res) => {
                                    console.log(res);
                                    setShowPopup(false);
                                    notify(res.data.status);
                                  })
                                  .catch((error) => {
                                    if (error.response) {
                                      console.error(
                                        "Server responded with status:",
                                        error.response.status
                                      );
                                      console.error(
                                        "Response data:",
                                        error.response.data
                                      );
                                      notify(
                                        "Error: " + error.response.data.message,
                                        "error"
                                      );
                                    } else if (error.request) {
                                      console.error(
                                        "No response received:",
                                        error.request
                                      );
                                      notify(
                                        "No response received from server!",
                                        "error"
                                      );
                                    } else {
                                      console.error(
                                        "Error setting up the request:",
                                        error.message
                                      );
                                      notify(
                                        "Error setting up the request!",
                                        "error"
                                      );
                                    }
                                  });
                              }
                            }}
                          >
                            {({
                              setFieldValue,
                              handleChange,
                              values,
                              errors,
                            }) => (
                              <Form name="form">
                                {/* <div className="form_wrap">
                                  <div className="form_item">
                                    <label className="form-label">
                                      Origin :
                                    </label>
                                    <Field
                                      type="text"
                                      name="origin"
                                      className="form-control"
                                      placeholder="origin"
                                    />
                                  </div>
                                </div> */}
                                <div className="form_wrap">
                                  <div className="form_item">
                                    <label className="form-label">
                                      Origin :
                                    </label>
                                    <Field
                                      as="select"
                                      name="origin"
                                      className={`form-control ${
                                        errors.origin ? "is-invalid" : ""
                                      }`}
                                      value={values.origin}
                                      onChange={handleChange}
                                    >
                                      <option value="">Select Origin</option>
                                      {gujaratCities.map((city, index) => (
                                        <option key={index} value={city}>
                                          {city}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                </div>
                                {/* <div className="form_wrap">
                                  <div className="form_item">
                                    <label className="form-label">
                                      Destination :
                                    </label>
                                    <Field
                                      type="text"
                                      name="destination"
                                      className="form-control"
                                      placeholder="destination"
                                    />
                                  </div>
                                </div> */}
                                <div className="form_wrap">
                                  <div className="form_item">
                                    <label className="form-label">
                                      Destination :
                                    </label>
                                    <Field
                                      as="select"
                                      name="destination"
                                      className={`form-control ${
                                        errors.destination ? "is-invalid" : ""
                                      }`}
                                      value={values.destination}
                                      onChange={handleChange}
                                    >
                                      <option value="">
                                        Select Destination
                                      </option>
                                      {gujaratCities.map((city, index) => (
                                        <option key={index} value={city}>
                                          {city}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                </div>

                                <div className="form_wrap">
                                  <div className="form_item">
                                    <label className="form-label">Name :</label>
                                    <Field
                                      as="select"
                                      name="name"
                                      className={`form-control ${
                                        errors.name ? "is-invalid" : ""
                                      }`}
                                      value={values.name}
                                      onChange={(e) => {
                                        const selectedName = e.target.value;
                                        setFieldValue("name", selectedName);
                                        if (nameToNumberMap[selectedName]) {
                                          setFieldValue(
                                            "no",
                                            nameToNumberMap[selectedName]
                                          );
                                        } else {
                                          setFieldValue("no", "");
                                        }
                                      }}
                                    >
                                      <option value="">Select Name</option>
                                      {categories.map((name, index) => (
                                        <option key={index} value={name}>
                                          {name}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                </div>
                                <div className="form_wrap">
                                  <div className="form_item">
                                    <label className="form-label">No :</label>
                                    <Field
                                      as="select"
                                      name="no"
                                      disabled
                                      className={`form-control ${
                                        errors.name ? "is-invalid" : ""
                                      }`}
                                      value={values.no}
                                      onChange={handleChange}
                                    >
                                      <option value="">Select No</option>
                                      {numbers.map((no, index) => (
                                        <option key={index} value={no}>
                                          {no}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                </div>
                                <div className="form_wrap">
                                  <div className="form_item">
                                    <label className="form-label">
                                      Take of Time :
                                    </label>
                                    <Field
                                      type="time"
                                      name="takeoftime"
                                      className="form-control"
                                      placeholder="take of time"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form_wrap">
                                      <div className="form_item">
                                        <label className="form-label">
                                          Date :
                                        </label>
                                        <Field
                                          type="date"
                                          name="date"
                                          className="form-control"
                                          placeholder="date"
                                          min={getCurrentDate()}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form_wrap">
                                      <div className="form_item">
                                        <label className="form-label">
                                          Price :
                                        </label>
                                        <Field
                                          type="text"
                                          name="price"
                                          className="form-control"
                                          placeholder="price"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-center mt-5">
                                  <button
                                    className="btn btn-dark"
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="table-responsive">
                <table className="table table-light table-hover">
                  <thead>
                    <tr className="table-dark text-center">
                      <th>Counter</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Name</th>
                      <th>No</th>
                      <th>Take of time</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {getdata.map((el, index) => {
                      const date = moment(el.date).format("MM/DD/YYYY");

                      return (
                        <Routescardprops
                          key={el._id}
                          counter={index + 1}
                          origin={el.origin}
                          destination={el.destination}
                          name={el.name}
                          no={el.no}
                          takeoftime={el.takeoftime}
                          date={date}
                          price={el.price}
                          update={
                            <button
                              className="btn btn-warning"
                              onClick={() => togglePopup(el._id)}
                            >
                              Update
                            </button>
                          }
                          delete={
                            <button
                              className="btn btn-danger"
                              onClick={() => delhandel(el._id)}
                            >
                              Delete
                            </button>
                          }
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          }
        />
      ) : (
        <NetworkErrorcompoes />
      )}

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
        theme="colored"
        transition={Zoom}
      />
    </div>
  );
};
