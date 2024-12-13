import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import axios from "axios";
import { Feedbackcardprops } from "./feedbackcardprops";
import { Sidebar } from "../sidebar";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

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

  const [getdata, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/feedback/view")
      .then((res) => {
        setdata(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const delhandel = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:3000/feedback/delete/${e}`)
      .then((res) => {
        notify(res.data.status);
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
          feedback={
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
                      Feedback
                      <span className="line"></span>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-light table-hover">
                  <thead>
                    <tr className="table-dark text-center">
                      <th>Counter</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Message</th>
                      <th>Profession</th>
                      <th>delete</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {getdata.map((el, index) => {
                      return (
                        <Feedbackcardprops
                          key={index}
                          counter={index + 1}
                          image={"http://localhost:3000/images/" + el.image}
                          name={el.name}
                          message={el.message}
                          profession={el.profession}
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
