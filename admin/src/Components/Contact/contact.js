import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import axios from "axios";
import { Contactcardprops } from "./contactcardprops";
import { Sidebar } from "../sidebar";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Contact = () => {
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/contact/view")
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
      .delete(`http://localhost:3000/contact/delete/${e}`)
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
          contact={
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
                      Contact
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
                      <th>Name</th>
                      <th>Message</th>
                      <th>Email</th>
                      <th>Mno</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {getdata.map((el, index) => {
                      return (
                        <Contactcardprops
                          counter={index + 1}
                          name={el.name}
                          email={el.email}
                          mno={el.mno}
                          message={el.message}
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
