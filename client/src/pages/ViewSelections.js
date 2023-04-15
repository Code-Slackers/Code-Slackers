import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TripById from "../components/TripById/index.js";
import { QUERY_LOCATION, QUERY_TRIP } from "../utils/queries";
const ViewSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const locationId = params.locationId;

  const { loading, data } = useQuery(QUERY_LOCATION, {
    variables: { locationId: locationId },
  });

  const trip = useQuery(QUERY_TRIP, {
    variables: { tripId: params.tripId },
  });

  if (loading || trip.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  const tripData = trip.data.trip || [];

  return (
    <div
      id={params.locationId}
      className="py-6 max-w-screen-md mx-auto"
    >
      <div className="flex mb-8 justify-between items-center flex-wrap gap-4">
      <h1 className=" text-3xl font-bold">
        Your Trip to {data.location.city}, {data.location.state}
        </h1>
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
      <p className="font-bold">
        Here's where you'll find all the key details for your trip.
      </p>
      <p>If you're building your own, start adding items to each category.</p>
      <p>
        If you're checking out a past trip's items, feel free to update them.
      </p> 
      <div>
        <h2 className="mt-8 text-2xl font-bold">This Trip</h2>
        {trip.loading ? (
          <div className="spinner"></div>
        ) : (
          <TripById trip={tripData} />
        )}
      </div>
    </div>
  );
};

export default ViewSelection;
