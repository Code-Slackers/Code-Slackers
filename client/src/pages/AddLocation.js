import React from "react";
import AddLocationForm from "../components/AddLocationForm";

const addLocation = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="my-3 col-12 col-md-10">
          <AddLocationForm />
        </div>
      </div>
    </main>
  );
};

export default addLocation;
