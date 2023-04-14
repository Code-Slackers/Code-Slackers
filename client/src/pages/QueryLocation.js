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
    locationFilter = locations.filter(
      (location) => location.state === params.st
    );
  }

  const addLocationHandler = () => {
    window.location.assign("/addLocation");
  };

  return (
    <main className="container px-4 mx-auto">
      <div className="mt-8 mb-12 overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 text-white bg-primary">
          <h1 className="text-2xl font-bold">Cities to Visit</h1>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-bold">
              You are currently filtering by <strong>{params.st}</strong>
            </h2>
          </div>
          <div className="mb-6">
            <div className="p-4">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <LocationList locations={locationFilter} />
              )}
            </div>
          </div>
          <p>Don't see the city you want to visit? Add it to the list.</p>
          <button
            id="addLocationButton"
            className="px-4 py-2 text-black bg-secondary rounded-lg hover:bg-primary hover:text-white"
            type="submit"
            onClick={addLocationHandler}
          >
            ADD A CITY
          </button>
        </div>
      </div>
    </main>
  );
};

export default QueryLocation;
