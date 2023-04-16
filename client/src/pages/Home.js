import React from "react";

import USAMap from "../components/USAMap";

const Home = () => {
  return (
    <main>
      <div className="text-center">
        <h1 className="my-4">Been places? Going places?</h1>
        <p>Either way, we want to hear from you.</p>
        <p>Select a state to share or explore your travels.</p>
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
