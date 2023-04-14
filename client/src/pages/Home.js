import React from "react";

import USAMap from "../components/USAMap";

const Home = () => {
  return (
    <main>
      <div className="">
        <h1>Where To?</h1>
        <p>Select the state you'd like to explore.</p>
        <div className="">
          <div>
            <USAMap />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
