import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LocationList from "../components/Locations/index.js";
import { QUERY_LOCATIONS } from "../utils/queries";
const QueryLocation = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <main className="max-w-screen-md mx-auto">
      <div className="mt-8 mb-12 overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 text-white bg-primary flex justify-between items-center flex-wrap gap-4 w-full">
          <h1 className="text-2xl font-bold">Cities to Visit</h1>
          {location.pathname !== "/" && (
            <button
              className="px-4 py-2 text-black bg-secondary rounded-lg hover:bg-brand-yellow transition-all hover:text-white flex items-center gap-2 "
              onClick={() => navigate(-1)}
            >
              <ArrowLongLeftIcon className="w-5 h-5" />
              Go Back
            </button>
          )}
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-bold">
              You are currently filtering by <strong>{params.st}</strong>
            </h2>
          </div>
          <div className="mb-6">
            <div className=" ">
              {loading ? (
                <div className="text-center text-lg font-medium">Loading...</div>
              ) : (
                <LocationList locations={locationFilter} />
              )}
            </div>
          </div>
          <p className="text-base pb-4">Don't see the city you want to visit? Add it to the list.</p>
          <button
            id="addLocationButton"
            className="px-4 py-2 text-black bg-secondary rounded-lg hover:bg-brand-yellow transition-all  hover:text-white"
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
