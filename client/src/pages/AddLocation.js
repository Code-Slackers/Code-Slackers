import React from "react";
import AddLocationForm from "../components/AddLocationForm";

const addLocation = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <AddLocationForm />
        </div>
      </div>
    </main>
  );
};

export default addLocation;
