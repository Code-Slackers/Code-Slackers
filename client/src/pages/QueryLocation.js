import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";
import LocationList from "../components/Locations/index.js";

const QueryLocation = () => {
  const params = useParams();
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];
  // console.log("location", locations[0]);
  let locationFilter = [];
  if (!loading) {
    locationFilter = locations.filter((location) => location.state === params.st);
    // console.log(locationFilter, st);
    // console.log(locations);
  }

  // const locationFilter = locations.filter((location) => location.st === "IL");
  // console.log(st, locationFilter);

  return (
    <main>
      <div className="mb-3 col-12 col-md-8">{loading ? <div>Loading...</div> : <LocationList locations={locationFilter} />}</div>
      <div>{loading ? <div>Loading...</div> : <div> {locations[0].state} </div>}</div>
      <button className="mt-4 text-white btn btn-primary" type="submit">
        Submit
      </button>
    </main>
  );
};
export default QueryLocation;
