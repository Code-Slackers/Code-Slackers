import React from "react";
import AddThingsToDoForm from "../components/AddThingsToDoForm";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";

const AddThingsToDo = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">{loading ? <div>Loading...</div> : <AddThingsToDoForm locations={locations} />}</div>
      </div>
    </main>
  );
};

export default AddThingsToDo;
