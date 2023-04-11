import React from "react";
import UpdateFoodForm from "../components/AddFoodForm";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";

const AddFood = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">{loading ? <div>Loading...</div> : <UpdateFoodForm locations={locations} />}</div>
        <div className="col-12 col-md-10 my-3">{loading ? <div>Loading...</div> : <CloudinaryUploadWidget />}</div>
      </div>
    </main>
  );
};

export default AddFood;
