import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";
import LocationList from "../components/Locations/index.js";

const QueryLocation = () => {
  const params = useParams();
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];
  let locationFilter = [];
  if (!loading) {
    locationFilter = locations.filter((location) => location.state === params.st);
  }

  const addLocationHandler = () => {
    window.location.assign("/addLocation");
  };

  return (
    <main>
      <div className="mb-3 col-12 col-md-8">{loading ? <div>Loading...</div> : <LocationList locations={locationFilter} />}</div>
      <button id="addLocationButton" className="mt-4 text-white btn btn-primary" type="submit" onClick={addLocationHandler}>
        ADD A NEW LOCATION
      </button>
    </main>
  );
};
export default QueryLocation;
