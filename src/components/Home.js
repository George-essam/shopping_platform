import React from "react";
import Store from "./Store";

const Home = () => {
  return (
    <container>
      <div className="hero">
        <div className="card bg-dark text-black border-0">
          <img
            src="../imgs/bg3.jpg"
            class="card-img"
            alt="Background"
            height="650px"
          />
          <div className="card-img-overlay d-flex flex-column justify-content-center">
            <div className="container">
              <h5 className="card-title display-4 fw-bolder mb-0">
                NEW SEASON ARRIVALS
              </h5>
              <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            </div>
          </div>
        </div>
        <Store/>
      </div>
    </container>
  );
};
export default Home