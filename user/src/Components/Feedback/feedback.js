import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  profession: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  message: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
});

export const Feedback = () => {
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

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
      theme: "dark",
      transition: Zoom,
    });
  };
  return (
    <div>
      <Header />
      {isOnline ? (
        <div>
          <div
            className="container-fluid page-header mb-5 p-0"
            style={{
              backgroundImage: "url(images/feedback.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
            }}
          >
            <div className="container-fluid page-header-innerdetails py-5">
              <div className="container text-center pb-5">
                <h3 className="text-white" style={{ marginTop: "200px" }}>
                  Feedback
                </h3>
              </div>
            </div>
          </div>

          <div className="row mt-3 mx-3 mb-5" style={{ margintop: 25 }}>
            <div className="col-md-12 justify-content-center">
              <Formik
                initialValues={{
                  name: "",
                  image: "",
                  message: "",
                  profession: "",
                }}
                validationSchema={FeedbackSchema}
                onSubmit={async (values, { resetForm }) => {
                  const formData = new FormData();
                  formData.append("name", values.name);
                  formData.append("image", image);
                  formData.append("message", values.message);
                  formData.append("profession", values.profession);

                  try {
                    const res = await axios.post(
                      "http://localhost:3000/feedback/add",
                      formData
                    );
                    console.log(res);
                    notify(res.data.status);
                    resetForm();
                  } catch (error) {
                    if (error.response) {
                      // The request was made and the server responded with a status code
                      console.error(
                        "Server responded with status:",
                        error.response.status
                      );
                      console.error("Response data:", error.response.data);
                      notify("Error: " + error.response.data.message, "error");
                    } else if (error.request) {
                      // The request was made but no response was received
                      console.error("No response received:", error.request);
                      notify("No response received from server!", "error");
                    } else {
                      // Something happened in setting up the request that triggered an error
                      console.error(
                        "Error setting up the request:",
                        error.message
                      );
                      notify("Error setting up the request!", "error");
                    }
                  }
                }}
              >
                {({ setFieldValue }) => (
                  <div className="card card-custom pb-0">
                    <div className="card-body m-5 mx-5">
                      <Form>
                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <input
                                type="file"
                                name="image"
                                id="image"
                                className="form-control text-black"
                                onChange={(e) => {
                                  handleImageChange(e);
                                  setFieldValue("image", e.target.files[0]);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <Field
                                type="text"
                                name="name"
                                id="name"
                                className="form-control text-black"
                                placeholder="Enter Your Name"
                              />
                              <ErrorMessage name="name" component="div" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-outline">
                              <Field
                                name="profession"
                                id="profession"
                                type="text"
                                className="form-control text-black"
                                placeholder="Enter Your Profession"
                              />
                              <ErrorMessage name="profession" component="div" />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <Field
                                as="textarea"
                                className="form-control text-black"
                                name="message"
                                id="message"
                                cols={30}
                                rows={5}
                                placeholder="Enter your Message"
                              />
                              <ErrorMessage name="message" component="div" />
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
