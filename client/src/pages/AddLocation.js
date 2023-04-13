import React from "react";
import AddLocationForm from "../components/AddLocationForm";

const AddLocation = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="my-3 col-12 col-md-10">
          <div className="p-3 card">
            <h2>Add Location</h2>
            <AddLocationForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddLocation;
