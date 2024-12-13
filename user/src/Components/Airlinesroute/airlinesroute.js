import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import axios from "axios";
import { Airlinesroutecardprops } from "./airlinesroutecardprops";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Airlinesroute = () => {
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

  const history = useHistory();
  const [getdata, setdata] = useState([]);

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

  return (
    <div>
      <Header />
      {isOnline ? (
        <div>
          <div
            className="container-fluid page-header mb-5 p-0"
            style={{
              backgroundImage: "url(images/routes.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
            }}
          >
            <div className="container-fluid page-header-innerdetails py-5">
              <div className="container text-center pb-5">
                <h3 className="text-white" style={{ marginTop: "200px" }}>
                  Airlines Route
                </h3>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="text-center mb-5">
              <h2 className="section-heading text-uppercase">Airlines route</h2>
            </div>
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
                  <th>View</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {getdata.map((el, index) => {
                  const date = moment(el.date).format("MM/DD/YYYY");
                  return (
                    <Airlinesroutecardprops
                      key={el._id}
                      counter={index + 1}
                      origin={el.origin}
                      destination={el.destination}
                      name={el.name}
                      no={el.no}
                      takeoftime={el.takeoftime}
                      date={date}
                      price={el.price}
                      view={
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            history.push(
                              `/book/${encodeURIComponent(
                                JSON.stringify({
                                  origin: el.origin,
                                  destination: el.destination,
                                  takeoftime: el.takeoftime,
                                  date: el.date,
                                  name: el.name,
                                  no: el.no,
                                  price: el.price,
                                })
                              )}`
                            )
                          }
                        >
                          Book
                        </button>
                      }
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <NetworkErrorcompoes />
      )}

      <Footer />
    </div>
  );
};
