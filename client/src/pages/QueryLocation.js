import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";
import LocationList from "../components/Locations/index.js";

const QueryLocation = () => {
  const st = useParams();
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];
  // console.log("location", locations[0]);
  // console.log("state", locations[0].state);

  // const locationFilter = locations.filter((location) => location.st === "IL");
  // console.log(st, locationFilter);

  return (
    <main>
      <div className="mb-3 col-12 col-md-8">{loading ? <div>Loading...</div> : <LocationList locations={locations} />}</div>

      <button className="mt-4 text-white btn btn-primary" type="submit">
        Submit
      </button>
    </main>
  );
};
export default QueryLocation;
