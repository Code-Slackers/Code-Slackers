import React from "react";
import AddFoodForm from "../components/AddFoodForm";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";

const AddFood = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];

  return (
    <div className="py-5">
        {
          loading ? <div>Loading...</div>
            : (
              <div>
                <AddFoodForm locations={locations} />
              </div>
            )
        }
    </div>
  );
};

export default AddFood;
