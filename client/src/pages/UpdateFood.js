import React from "react";
import UpdateFoodForm from "../components/UpdateFoodForm";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";

const UpdateFood = () => {
  return (
    <main className="container px-4 mx-auto">
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full md:w-1/2">
          <div className="px-6 py-4 text-white bg-blue-500">
            <h1 className="text-2xl font-bold">Update Food</h1>
          </div>
          <div className="px-6 py-8 bg-white rounded-lg shadow-lg">
            <UpdateFoodForm />
          </div>
          <div className="px-6 py-8 mt-4 bg-white rounded-lg shadow-lg">
            <CloudinaryUploadWidget />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateFood;
