import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { Servicecardprops } from "./servicecardprops";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik } from "formik";
import { Sidebar } from "../sidebar";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdUpdate } from "react-icons/md";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Service = () => {
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
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup1 = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/service/view")
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getdata]);

  const delhandel = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:3000/service/delete/${e}`)
      .then((res) => {
        notify(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [getdata1, setdata1] = useState({
    image: "",
    name: "",
    description: "",
  });
  const [getempid, setempid] = useState();

  const togglePopup = (e) => {
    setempid(e);
    console.log(getdata1);

    setShowPopup(!showPopup);
    axios
      .get(`http://localhost:3000/service/show/${e}`)
      .then((res) => {
        setdata1(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          service={
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
                      Service
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
                              const formData = new FormData(); // Create FormData object to send file
                              formData.append("image", image); // Append image file to FormData
                              formData.append("name", values.name);
                              formData.append(
                                "description",
                                values.description
                              );

                              if (getempid) {
                                axios
                                  .put(
                                    `http://localhost:3000/service/update/${getempid}`,
                                    formData
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
                                    "http://localhost:3000/service/add",
                                    formData
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
                            <Form name="form">
                              <div className="form_wrap">
                                <div className="form_item">
                                  <label className="form-label">Image :</label>
                                  <input
                                    style={{ paddingLeft: "50px" }}
                                    type="file"
                                    required
                                    id="formFile"
                                    placeholder="Image"
                                    onChange={(e) =>
                                      setImage(e.target.files[0])
                                    }
                                  />
                                </div>
                              </div>
                              <div className="form_wrap">
                                <div className="form_item">
                                  <label className="form-label">Name :</label>
                                  <Field
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="name"
                                  />
                                </div>
                              </div>
                              <div className="form_wrap">
                                <div className="form_item">
                                  <label className="form-label">
                                    Description :
                                  </label>
                                  <Field
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    placeholder="description"
                                  />
                                </div>
                              </div>
                              <div className="d-grid gap-2 d-md-flex justify-content-center mt-5">
                                <button className="btn btn-dark" type="submit">
                                  Submit
                                </button>
                              </div>
                            </Form>
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <section className="amazing_feature">
                <div className="container">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {getdata.map((el, index) => {
                      return (
                        <Servicecardprops
                          image={"http://localhost:3000/images/" + el.image}
                          name={el.name}
                          description={el.description}
                          update={
                            <i
                              style={{ fontSize: "25px" }}
                              onClick={() => togglePopup(el._id)}
                            >
                              <MdUpdate />
                            </i>
                          }
                          delete={
                            <i
                              style={{ fontSize: "25px" }}
                              onClick={() => delhandel(el._id)}
                            >
                              <RiDeleteBin4Fill />
                            </i>
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </section>
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
        theme="light"
        transition={Zoom}
      />
    </div>
  );
};
