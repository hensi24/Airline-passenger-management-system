import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/header";
import * as Yup from "yup";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Login = () => {
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

  const [showSignInForm, setShowSignInForm] = useState(true);
  const [image, setImage] = useState(null);
  localStorage.clear();
  const history = useHistory();

  const handleToggleForm = () => {
    setShowSignInForm(!showSignInForm);
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "It accepts minimum 2 characters!")
      .max(100, "It accepts maximum 100 characters!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const SignupSchemaLogin = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
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

  const formContainerRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Adding event listeners for focus and blur
    inputRefs.current.forEach((input) => {
      const parentElement = input?.parentElement?.parentElement;
      if (parentElement) {
        input.addEventListener("focus", () => {
          parentElement.classList.add("box-login-animation");
        });
        input.addEventListener("blur", () => {
          parentElement.classList.remove("box-login-animation");
        });
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      inputRefs.current.forEach((input) => {
        const parentElement = input?.parentElement?.parentElement;
        if (parentElement) {
          input.removeEventListener("focus", () => {
            parentElement.classList.add("box-login-animation");
          });
          input.removeEventListener("blur", () => {
            parentElement.classList.remove("box-login-animation");
          });
        }
      });
    };
  }, []); // Empty dependency array to only run on mount/unmount

  const handleButtonClick = () => {
    formContainerRef.current.classList.toggle("left-right");
  };

  return (
    <div>
      {isOnline ? (
        <section>
          <div className="login-body">
            <div className="main-form-container">
              <div
                id="form_section"
                className="form-container"
                ref={formContainerRef}
              >
                {/* Login Form */}
                <div className="login-form form-wraper">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={SignupSchemaLogin}
                    onSubmit={async (values, { resetForm }) => {
                      axios
                        .post("http://localhost:3000/user_login/login", values)
                        .then((res) => {
                          console.log(res);
                          sessionStorage.setItem("usertoken", res.data.token);
                          localStorage.setItem("userid", res.data.data._id);
                          notify(res.data.status);
                          history.push("/");
                          resetForm();
                        })
                        .catch((error) => {
                          console.log(error);
                          notify("Data will not match", "error");
                        });
                    }}
                  >
                    <div className="loginbg">
                      <Form>
                        <div>
                          <div className="form-title">
                            <h2>Login</h2>
                          </div>
                          <div className="input-group">
                            <div className="box-login">
                              <span>
                                <Field
                                  ref={(el) => (inputRefs.current[0] = el)}
                                  placeholder="Email"
                                  className="myInput"
                                  type="text"
                                  name="email"
                                  required
                                />
                                <ErrorMessage name="email" />
                              </span>
                            </div>
                          </div>

                          <div className="input-group">
                            <div className="box-login">
                              <span>
                                <Field
                                  ref={(el) => (inputRefs.current[1] = el)}
                                  placeholder="Password"
                                  className="myInput"
                                  type="password"
                                  name="password"
                                />
                                <ErrorMessage name="password" />
                              </span>
                            </div>
                          </div>

                          <div className="forget-password">
                            <p
                              onClick={() => {
                                history.push("/forget");
                              }}
                            >
                              FORGOT PASSWORD
                            </p>
                          </div>

                          <div className="action-button">
                            <button type="submit">Login</button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </Formik>
                </div>

                {/* Sign Up Form */}
                <div className="signUp-form form-wraper">
                  <Formik
                    initialValues={{
                      name: "",
                      mno: "",
                      email: "",
                      password: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, { resetForm }) => {
                      const formData = new FormData();
                      formData.append("image", image);
                      formData.append("name", values.name);
                      formData.append("mno", values.mno);
                      formData.append("email", values.email);
                      formData.append("password", values.password);
                      // Object.entries(values).forEach(([key, value]) =>
                      //   formData.append(key, value)
                      // );
                      axios
                        .post("http://localhost:3000/user_login/add", formData)
                        .then((res) => {
                          console.log(res);
                          notify(res.data.status);
                          resetForm();
                        })
                        .catch((error) => {
                          console.log(error);
                          notify("Error occurred", "error");
                        });
                    }}
                  >
                    <Form>
                      <div className="form-title">
                        <h2>Sign Up</h2>
                      </div>
                      <div className="input-group">
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => setImage(e.target.files[0])}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <div className="box-login">
                          <span>
                            <Field
                              placeholder="Full Name"
                              className="myInput"
                              type="text"
                              name="name"
                              required
                            />
                            <ErrorMessage name="name" />
                          </span>
                        </div>
                      </div>
                      <div className="input-group">
                        <div className="box-login">
                          <span>
                            <Field
                              placeholder="Email"
                              className="myInput"
                              type="text"
                              name="email"
                              required
                            />
                            <ErrorMessage name="email" />
                          </span>
                        </div>
                      </div>
                      <div className="input-group">
                        <div className="box-login">
                          <span>
                            <Field
                              placeholder="Mobile No."
                              className="myInput"
                              type="text"
                              name="mno"
                              required
                            />
                            <ErrorMessage name="mno" />
                          </span>
                        </div>
                      </div>
                      <div className="input-group">
                        <div className="box-login">
                          <span>
                            <Field
                              placeholder="Password"
                              className="myInput"
                              type="password"
                              name="password"
                              required
                            />
                            <ErrorMessage name="password" />
                          </span>
                        </div>
                      </div>
                      <div className="action-button">
                        <button type="submit">Sign Up</button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>

              {/* Buttons */}
              <div id="multiple-btn" className="bg-btn-container">
                <div className="action-button">
                  <button onClick={handleButtonClick}>Login</button>
                </div>
                <div className="action-button">
                  <button onClick={handleButtonClick}>Sign Up</button>
                </div>
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
              theme="dark"
              transition={Zoom}
            />
          </div>
        </section>
      ) : (
        <NetworkErrorcompoes />
      )}
    </div>
  );
};
