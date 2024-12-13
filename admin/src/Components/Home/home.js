import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Sidebar } from "../sidebar";
import CountUp from "react-countup";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Home = () => {
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
  const [getuser, setuser] = useState([]);
  const [getbooking, setbooking] = useState([]);
  const [getroute, setroute] = useState([]);
  const [getservice, setservice] = useState([]);
  const [getairline, setairline] = useState([]);
  const [getairlineCandidate, setairlineCandidate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user_login/view")
      .then((res) => {
        setuser(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/airlines/view")
      .then((res) => {
        setairline(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/booking/view")
      .then((res) => {
        setbooking(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/airlineroute/view")
      .then((res) => {
        setroute(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/service/view")
      .then((res) => {
        setservice(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/booking/view")
      .then((res) => {
        const airlineData = res.data.data;
        setairline(airlineData);

        const candidateVoterCount = airlineData.reduce((acc, voter) => {
          const { pname } = voter;
          if (pname) {
            acc[pname] = (acc[pname] || 0) + 1;
          }
          return acc;
        }, {});

        const pieChartData = Object.keys(candidateVoterCount).map((pname) => ({
          name: pname,
          value: candidateVoterCount[pname],
        }));

        setairlineCandidate(pieChartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totaluser = getuser.length;
  const totalbooking = getbooking.length;
  const totalroute = getroute.length;
  const totalservice = getservice.length;

  const data = [
    { name: "User", number: totaluser },
    { name: "Booking", number: totalbooking },
    { name: "Route", number: totalroute },
    { name: "Service", number: totalservice },
  ];

  return (
    <div>
      {isOnline ? (
        <Sidebar
          home={
            <>
              <Header />

              <div>
                <div
                  className="d-flex indexcard text-white"
                  style={{ justifyContent: "space-evenly", marginTop: "30px" }}
                >
                  <div
                    className="card1 d-flex justify-content-evenly"
                    style={{ backgroundColor: "#1338BE" }}
                  >
                    <div className="row">
                      <div className="col-md-6" style={{ fontSize: "20px" }}>
                        <b>
                          {" "}
                          Total User <br />
                          <CountUp
                            start={0}
                            end={totaluser}
                            style={{ fontSize: "40px" }}
                            duration={4}
                          />
                        </b>{" "}
                      </div>
                      <div
                        className="col-md-6 d-flex justify-content-center align-items-center"
                        style={{ fontSize: "50px" }}
                      >
                        <i class="fa-solid fa-user"></i>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card1 d-flex justify-content-evenly"
                    style={{ backgroundColor: "#FFAA1D" }}
                  >
                    <div className="row">
                      <div className="col-md-6" style={{ fontSize: "20px" }}>
                        <b>
                          {" "}
                          Total Booking <br />
                          <CountUp
                            start={0}
                            end={totalbooking}
                            style={{ fontSize: "40px" }}
                            duration={4}
                          />
                        </b>
                      </div>

                      <div
                        className="col-md-6 d-flex justify-content-center align-items-center"
                        style={{ fontSize: "50px" }}
                      >
                        <i class="fa-solid fa-clipboard-list"></i>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card1 d-flex justify-content-evenly"
                    style={{ backgroundColor: "#C51E3A" }}
                  >
                    <div className="row">
                      <div className="col-md-6" style={{ fontSize: "20px" }}>
                        <b>
                          {" "}
                          Total Route <br />
                          <CountUp
                            start={0}
                            end={totalroute}
                            style={{ fontSize: "40px" }}
                            duration={4}
                          />
                        </b>
                      </div>
                      <div
                        className="col-md-6 d-flex justify-content-center align-items-center"
                        style={{ fontSize: "50px" }}
                      >
                        <i class="fa-solid fa-route"></i>{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    className="card1 d-flex justify-content-evenly"
                    style={{ backgroundColor: "#028A0F" }}
                  >
                    <div className="row">
                      <div className="col-md-6" style={{ fontSize: "20px" }}>
                        <b>
                          {" "}
                          Total Service <br />
                          <CountUp
                            start={0}
                            end={totalservice}
                            style={{ fontSize: "40px" }}
                            duration={4}
                          />
                        </b>{" "}
                      </div>
                      <div
                        className="col-md-6 d-flex justify-content-center align-items-center"
                        style={{ fontSize: "50px" }}
                      >
                        <i class="fa-solid fa-gears"></i>{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container" style={{ marginTop: "30px" }}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="reports col-md-6">
                        <ResponsiveContainer
                          width="100%"
                          height={400}
                          className="mt-5"
                        >
                          <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#00008b" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid
                              stroke="#ccc"
                              strokeDasharray="5 5"
                            />
                            <Bar dataKey="number" fill="#8884d8" barSize={30} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="reports col-md-6">
                        <h5 className="p-3 text-center">
                          BOOKING REPORT
                          <hr />
                        </h5>
                        <ResponsiveContainer width="100%" height={400}>
                          <PieChart>
                            <Pie
                              data={getairlineCandidate}
                              dataKey="value"
                              nameKey="name"
                              fill="#8884d8"
                              label
                            />
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
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
