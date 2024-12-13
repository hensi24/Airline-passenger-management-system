import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import axios from "axios";
import { Servicecardprops } from "./servicecardprops";
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

  return (
    <div>
      <Header />
      {isOnline ? (
        <div>
          <div
            className="container-fluid page-header mb-5 p-0"
            style={{
              backgroundImage: "url(images/service.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
            }}
          >
            <div className="container-fluid page-header-innerdetails py-5">
              <div className="container text-center pb-5">
                <h3 className="text-white" style={{ marginTop: "200px" }}>
                  Service
                </h3>
              </div>
            </div>
          </div>

          <section className="amazing_feature">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center heading-main mb-5">
                  <h2 className="heading">SERVICE</h2>
                </div>
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {getdata.map((el, index) => {
                  return (
                    <Servicecardprops
                      image={"http://localhost:3000/images/" + el.image}
                      name={el.name}
                      description={el.description}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <NetworkErrorcompoes />
      )}

      <Footer />
    </div>
  );
};
