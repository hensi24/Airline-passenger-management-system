import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Profile = () => {
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
      .get(
        `http://localhost:3000/user_login/show/${localStorage.getItem(
          "userid"
        )}`
      )
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getdata]);

  const logout = () => {
    history.push("/");
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div>
      {isOnline ? (
        <div
          style={{
            // backgroundImage: "url(images/about.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        >
          <Header />
          <div className="profile-container">
            <img
              src={"http://localhost:3000/images/" + getdata.image}
              alt="Profile Picture"
              className="profile-picture"
            />
            <div className="profile-info">
              <h2>{getdata.name}</h2>
              <p>{getdata.email}</p>
              <p>{getdata.mno}</p>
              <button
                type="button"
                className="btn profilebtn"
                onClick={() => logout()}
              >
                Logout
              </button>
              <br />
              <br />
              <a
                style={{ color: "white" }}
                onClick={() => {
                  history.push("/changepassword");
                }}
              >
                Change Password !
              </a>
            </div>
          </div>

          <Footer />
        </div>
      ) : (
        <NetworkErrorcompoes />
      )}
    </div>
  );
};
