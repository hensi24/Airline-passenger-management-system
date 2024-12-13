import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import axios from "axios";
import { Bookingcardprops } from "./bookingcardprops";
import moment from "moment";
import { Sidebar } from "../sidebar";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Booking = () => {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    axios
      .get("http://localhost:3000/booking/view")
      .then((res) => {
        const sortedData = res.data.data.sort((a, b) => {
          // Assuming `rdate` is the field for registration date
          return new Date(b.rdate) - new Date(a.rdate);
        });
        setdata(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const delhandel = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:3000/booking/delete/${e}`)
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Filter by search term and paginate
  const filteredName = getdata.filter((booking) =>
    booking.pname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredName.length / itemsPerPage);
  const currentData = filteredName.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {isOnline ? (
        <Sidebar
          booking={
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
                      Booking
                      <span className="line"></span>
                    </h1>
                  </div>
                </div>
                <div className="text-center">
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Search Airlines  name..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="form-control"
                      style={{ maxWidth: "300px", margin: "0 auto" }}
                    />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-light table-hover">
                  <thead>
                    <tr className="table-dark text-center">
                      <th>Counter</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Gender</th>
                      <th>Birthdate</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Seat No</th>
                      <th>Class</th>
                      <th>Register Date</th>
                      <th>Airlines Number</th>
                      <th>Airlines Name</th>
                      <th>Takeoff Time</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {currentData.map((el, index) => {
                      const date = moment(el.date).format("MM/DD/YYYY");
                      const rdate = moment(el.rdate).format("MM/DD/YYYY");
                      const bdate = moment(el.birthdate).format("MM/DD/YYYY");
                      return (
                        <Bookingcardprops
                          key={el._id}
                          counter={(currentPage - 1) * itemsPerPage + index + 1}
                          name={el.name}
                          email={el.email}
                          mno={el.mno}
                          gender={el.gender}
                          birthdate={bdate}
                          origin={el.origin}
                          destination={el.destination}
                          seat={el.seat}
                          aclass={el.aclass}
                          rdate={rdate}
                          pno={el.pno}
                          pname={el.pname}
                          takeoftime={el.takeoftime}
                          date={date}
                          price={el.price}
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
              <br></br>
              <br></br>

              {/* Pagination */}
              <div className="pagination justify-content-center">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="btn btn-sm btn-outline-dark"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => handlePageChange(pageIndex + 1)}
                    className={`btn btn-sm ${
                      currentPage === pageIndex + 1
                        ? "btn-dark"
                        : "btn-outline-dark"
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="btn btn-sm btn-outline-dark"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>

              <br></br>
              <br></br>
              <br></br>
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
