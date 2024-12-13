import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password must match.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/user_login/changepass",
        { email, oldPassword, newPassword }
      );
      history.push("/login");

      setMessage(res.data.message);
      toast.success(res.data.message, {
        position: "bottom-center",
        autoClose: 5000,
        transition: Zoom,
      });
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          transition: Zoom,
        });
      } else if (error.request) {
        toast.error("No response received from server!", {
          position: "bottom-center",
          autoClose: 5000,
          transition: Zoom,
        });
      } else {
        toast.error("Error setting up the request!", {
          position: "bottom-center",
          autoClose: 5000,
          transition: Zoom,
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleChangePassword} className="p-5">
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="text-center">
          <button type="submit" className="btn btn-dark">
            Change Password
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}

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
        theme="light"
        transition={Zoom}
      />
    </div>
  );
};
