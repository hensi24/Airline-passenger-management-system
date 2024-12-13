import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import axios from "axios";
import { Gallerycardprops } from "./gallerycardprops";
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

  return (
    <div>
      <Header />
      {isOnline ? (
        <div>
          <div
            className="container-fluid page-header mb-5 p-0"
            style={{
              backgroundImage: "url(images/gallery.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
            }}
          >
            <div className="container-fluid page-header-innerdetails py-5">
              <div className="container text-center pb-5">
                <h3 className="text-white" style={{ marginTop: "200px" }}>
                  Gallery
                </h3>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="text-center mb-5">
              <h2 className="section-heading text-uppercase">Gallery</h2>
            </div>
            <div className="gallery-image">
              {getdata.map((el, index) => {
                return (
                  <Gallerycardprops
                    image={"http://localhost:3000/images/" + el.image}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <NetworkErrorcompoes />
      )}
      <Footer />
    </div>
  );
};
