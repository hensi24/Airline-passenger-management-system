import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Gallerycardprops } from "./gallerycardprops";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form, Formik } from "formik";
import { Sidebar } from "../sidebar";
import { IoClose } from "react-icons/io5";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Gallery = () => {
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
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(null);

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

  const togglePopup1 = () => {
    setShowPopup(!showPopup);
  };

  const delhandel = (e) => {
    axios
      .delete(`http://localhost:3000/gallery/delete/${e}`)
      .then((res) => {
        notify(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isOnline ? (
        <Sidebar
          gallery={
            <>
              <Header />
              <div>
                <div>
                  {showPopup && (
                    <>
                      <div
                        className="container-fluid"
                        style={{ padding: "0px" }}
                      >
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
                              initialValues={{
                                image: "",
                              }}
                              onSubmit={async (values) => {
                                const formData = new FormData();
                                formData.append("image", image);
                                axios
                                  .post(
                                    "http://localhost:3000/gallery/add",
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
                              }}
                            >
                              <Form name="form">
                                <div className="form_wrap mt-5 mb-3">
                                  <div className="form_item">
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
                                <div className="d-grid gap-2 d-md-flex justify-content-center mt-5">
                                  <button
                                    className="btn btn-dark"
                                    type="submit"
                                  >
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

                <div className="p-5">
                  <div className="container-fluid py-5">
                    <div className="container text-center">
                      <h1
                        className="text-dark text-uppercase position-relative lines"
                        style={{ marginTop: "80px" }}
                      >
                        <span className="line"></span>
                        Gallery
                        <span className="line"></span>
                      </h1>
                    </div>
                  </div>

                  <div className="text-end mb-5">
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

                  <div className="gallery-image">
                    {getdata.map((el, index) => {
                      return (
                        <Gallerycardprops
                          image={"http://localhost:3000/images/" + el.image}
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
            </>
          }
        />
      ) : (
        <NetworkErrorcompoes />
      )}
    </div>
  );
};
