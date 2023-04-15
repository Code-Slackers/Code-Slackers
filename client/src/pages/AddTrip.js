import { useQuery } from "@apollo/client";
import React from "react";
import AddTripForm from "../components/AddTripForm";
import { QUERY_LOCATIONS } from "../utils/queries";

const AddTrip = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];

  return (
    <div className="py-5">
      {loading ? (
        <div className="text-center text-lg font-medium">Loading...</div>
      ) : (
        <div>
          <AddTripForm locations={locations} />
        </div>
      )}
    </div>
  );
};

export default AddTrip;
