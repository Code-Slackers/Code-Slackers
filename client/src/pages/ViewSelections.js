import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATION, QUERY_TRIP } from "../utils/queries";
import TripById from "../components/TripById/index.js";

const ViewSelection = () => {
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
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="mb-8 text-3xl font-bold">
        Your Trip to {data.location.city}, {data.location.state}
      </h1>
      <p className="font-bold">
        Here's where you'll find all the key details for your trip.
      </p>
      <p>If you're building your own, start adding items to each category.</p>
      <p>
        If you're checking out a past trip's items, feel free to update them.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"></div>
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
