import React from "react";
import AddLodgingForm from "../components/AddLodgingForm";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";

const AddLodging = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">{loading ? <div>Loading...</div> : <AddLodgingForm locations={locations} />}</div>
      </div>
    </main>
  );
};

export default AddLodging;
