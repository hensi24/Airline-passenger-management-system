import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import axios from "axios";
import { Menucardprops } from "./menucardprops";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Sidebar } from "../sidebar";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdUpdate } from "react-icons/md";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Menu = () => {
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
  const [categories, setCategories] = useState([]);
  const [times, setTimes] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/canteen/view")
      .then((res) => setdata(res.data.data))
      .catch((error) => console.error(error));
  }, [getdata]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/canteen/viewcategory"
        );
        const data = response.data.data;
        const map = {};
        data.forEach((item) => {
          map[item.name] = item.time; // Map category name to time
        });
        setCategoryMap(map);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/canteen/view")
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
          "http://localhost:3000/canteen/viewcategory"
        );
        const data = response.data.data;
        const nameToNumber = {};
        data.forEach((canteencategory) => {
          nameToNumber[canteencategory.name] = canteencategory.time;
        });
        setCategories(data.map((canteencategory) => canteencategory.name));
        setTimes(data.map((canteencategory) => canteencategory.time));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const togglePopup1 = () => {
    setShowPopup(!showPopup);
  };

  const delhandel = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:3000/canteen/delete/${e}`)
      .then((res) => {
        notify(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [getdata1, setdata1] = useState({
    image: "",
    foodname: "",
    name: "",
    time: "",
    price: "",
    description: "",
  });

  const [getempid, setempid] = useState();

  const togglePopup = (e) => {
    setempid(e);
    console.log(getdata1);

    setShowPopup(!showPopup);
    axios
      .get(`http://localhost:3000/canteen/show/${e}`)
      .then((res) => {
        setdata1(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategoryChange = (e, setFieldValue) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFieldValue("name", category); // Set selected category
    setFieldValue("time", categoryMap[category]); // Automatically set corresponding time
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
          menu={
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
                      Menu
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
                              const formData = new FormData();
                              formData.append("image", image);
                              formData.append("foodname", values.foodname);
                              formData.append("name", values.name);
                              formData.append("time", values.time);
                              formData.append("price", values.price);
                              formData.append(
                                "description",
                                values.description
                              );

                              if (getempid) {
                                axios
                                  .put(
                                    `http://localhost:3000/canteen/update/${getempid}`,
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
                                    "http://localhost:3000/canteen/add",
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
                            {({
                              setFieldValue,
                              handleChange,
                              values,
                              errors,
                            }) => (
                              <Form name="form">
                                <div className="form_wrap">
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="form_item">
                                        <label className="form-label">
                                          Image :
                                        </label>
                                        <input
                                          type="file"
                                          name="image"
                                          id="image"
                                          className="form-control text-black"
                                          onChange={(e) => {
                                            handleImageChange(e);
                                            setFieldValue(
                                              "image",
                                              e.target.files[0]
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form_item">
                                        <label className="form-label">
                                          Food Name :
                                        </label>
                                        <Field
                                          type="text"
                                          name="foodname"
                                          className="form-control"
                                          placeholder="Enter Food Name"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    {/* <div className="col-6">
                                      <div className="form_item">
                                        <label className="form-label">
                                          Category :
                                        </label>
                                        <Field
                                          as="select"
                                          name="name"
                                          className={`form-control ${
                                            errors.name ? "is-invalid" : ""
                                          }`}
                                          value={values.name}
                                          onChange={handleChange}
                                        >
                                          <option value="">
                                            Select Category
                                          </option>
                                          {categories.map((name, index) => (
                                            <option key={index} value={name}>
                                              {name}
                                            </option>
                                          ))}
                                        </Field>
                                        <ErrorMessage name="category" />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form_item">
                                        <label className="form-label">
                                          Time :
                                        </label>
                                        <Field
                                          as="select"
                                          name="time"
                                          className={`form-control ${
                                            errors.time ? "is-invalid" : ""
                                          }`}
                                          value={values.time}
                                          onChange={handleChange}
                                        >
                                          <option value="">
                                            Select Category
                                          </option>
                                          {times.map((time, index) => (
                                            <option key={index} value={time}>
                                              {time}
                                            </option>
                                          ))}
                                        </Field>
                                        <ErrorMessage name="time" />
                                      </div>
                                    </div> */}
                                    <div className="row">
                                      <div className="col-6">
                                        <div className="form_item">
                                          <label className="form-label">
                                            Category:
                                          </label>
                                          <Field
                                            as="select"
                                            name="name"
                                            className="form-control"
                                            value={values.name}
                                            onChange={(e) =>
                                              handleCategoryChange(
                                                e,
                                                setFieldValue
                                              )
                                            }
                                          >
                                            <option value="">
                                              Select Category
                                            </option>
                                            {Object.keys(categoryMap).map(
                                              (category, index) => (
                                                <option
                                                  key={index}
                                                  value={category}
                                                >
                                                  {category}
                                                </option>
                                              )
                                            )}
                                          </Field>
                                          <ErrorMessage
                                            name="name"
                                            component="div"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="form_item">
                                          <label className="form-label">
                                            Time:
                                          </label>
                                          <Field
                                            type="text"
                                            name="time"
                                            className="form-control"
                                            value={values.time}
                                            disabled // Prevent manual editing
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="form_item">
                                        <label className="form-label">
                                          Price :
                                        </label>
                                        <Field
                                          type="text"
                                          name="price"
                                          className="form-control"
                                          placeholder="Enter Food Price"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form_item">
                                        <label className="form-label">
                                          Description :
                                        </label>
                                        <Field
                                          type="text"
                                          name="description"
                                          className="form-control"
                                          placeholder="Enter Food Description"
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

              <div className="mt-5">
                <div className="tab-content col-lg-12" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="breakfast"
                    role="tabpanel"
                    aria-labelledby="breakfast-tab"
                  >
                    {getdata.map((el, index) => (
                      <div key={index} className="col-md-12">
                        <Menucardprops
                          image={"http://localhost:3000/images/" + el.image}
                          name={el.name}
                          price={el.price}
                          foodname={el.foodname}
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
                      </div>
                    ))}
                  </div>
                </div>
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
