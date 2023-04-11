import React from "react";
import UpdateFoodForm from "../components/UpdateFoodForm";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";

const UpdateFood = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">{<UpdateFoodForm />}</div>
        <div className="col-12 col-md-10 my-3">{<CloudinaryUploadWidget />}</div>
      </div>
    </main>
  );
};

export default UpdateFood;
