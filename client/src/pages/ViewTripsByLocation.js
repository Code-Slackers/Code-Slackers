import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TripsByLocation from "../components/TripsByLocation/index.js";
import { QUERY_TRIPSBYLOCATION } from "../utils/queries";
const ViewTripsByLocation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locationId } = useParams();
  const { loading, data } = useQuery(QUERY_TRIPSBYLOCATION, {
    variables: { locationId: locationId },
  });

  const city = data?.location.city || "";
  const state = data?.location.state || "";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl font-semibold text-gray-800">Loading...</div>
      </div>
    );
  }

  const trips = data?.location.trips || [];
  console.log("trips", trips);

  const newTripHandler = () => {
    window.location.assign(`/addTrip/${locationId}`);
  };

  if (!trips.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl font-semibold text-gray-800">No Trips Yet</div>
        <button
          onClick={newTripHandler}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          BUILD YOUR OWN TRIP
        </button>
      </div>
    );
  }
  return (
    <div
      id={locationId}
      className="flex flex-col items-center py-4 max-w-screen-md mx-auto space-y-8"
    >
      <div className="flex justify-between items-center flex-wrap gap-4 w-full">
        <h1 className="text-3xl font-semibold text-gray-800">
          {city}, Here We Come
        </h1>
        {location.pathname !== "/" && (
          <button
            className="px-4 py-2 text-black bg-secondary rounded-lg hover:bg-brand-yellow transition-all hover:text-white flex items-center gap-2 "
            onClick={() => navigate(-1)}
          >
            <ArrowLongLeftIcon className="w-5 h-5" />
            Back
          </button>
        )}
      </div>
      <div className="w-full">
        <button
          onClick={newTripHandler}
          className="px-4 py-2 font-bold mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          BUILD YOUR OWN TRIP
        </button>
        <p>
          Looking for inspiration? Check out past trips below to make your own.
        </p>
        <div>
          {loading ? (
            <div className="text-center text-lg font-medium">Loading...</div>
          ) : (
            <TripsByLocation trips={trips} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTripsByLocation;
