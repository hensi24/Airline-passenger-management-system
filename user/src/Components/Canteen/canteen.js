import React, { useEffect, useState } from "react";
import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { Canteencardprops } from "./canteencardprops";
import axios from "axios";
import { NetworkErrorcompoes } from "../NetworkErrorcompoes";

export const Canteen = () => {
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
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/canteen/view")
      .then((res) => {
        const data = res.data.data;
        setdata(data);
        setFilteredData(data);

        // Extract unique categories from data
        const uniqueCategories = [...new Set(data.map((item) => item.name))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryFilter = (category) => {
    if (category === "All") {
      setFilteredData(getdata);
    } else {
      const filteredItems = getdata.filter((item) => item.name === category);
      setFilteredData(filteredItems);
    }
  };

  return (
    <div>
      {" "}
      {isOnline ? (
        <div>
          <div
            className="container-fluid page-header mb-5 p-0"
            style={{
              backgroundImage: "url(images/canteen.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
            }}
          >
            <div className="container-fluid page-header-innerdetails py-5">
              <div className="container text-center pb-5">
                <h3 className="text-white" style={{ marginTop: "200px" }}>
                  Canteen
                </h3>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="container mt-4 text-center">
            <button
              className="btn btn-outline-dark mx-2"
              onClick={() => handleCategoryFilter("All")}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className="btn btn-outline-dark mx-2"
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Display Items */}
          <div className="mt-5">
            <div className="tab-content col-lg-12" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="breakfast"
                role="tabpanel"
                aria-labelledby="breakfast-tab"
              >
                {filteredData.length > 0 ? (
                  filteredData.map((el, index) => (
                    <div key={index} className="col-md-12">
                      <Canteencardprops
                        image={"http://localhost:3000/images/" + el.image}
                        name={el.name}
                        price={el.price}
                        foodname={el.foodname}
                        description={el.description}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <h4>No items found for this category</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NetworkErrorcompoes />
      )}
      <Header />
      <Footer />
    </div>
  );
};
