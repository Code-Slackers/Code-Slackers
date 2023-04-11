import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";
import AddTripForm from "../components/AddTripForm";
import AddLocationForm from "../components/AddLocationForm";

const AddTrip = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];

  return (
    <div className="py-5">
        {
          loading ? <div>Loading...</div>
            : (
              <div>
                <AddTripForm locations={locations} />
              </div>
            )
        }
    </div>
  );
};

export default AddTrip