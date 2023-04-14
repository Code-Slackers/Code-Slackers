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

  const ViewFood = () => {
    window.location.assign(`/viewFood/${params.locationId}/${params.tripId}`);
  };

  const ViewTransportation = () => {
    window.location.assign(`/viewTransportation/${params.locationId}/${params.tripId}`);
  };

  const ViewThingsToDo = () => {
    window.location.assign(`/viewThingsToDo/${params.locationId}/${params.tripId}`);
  };

  const ViewLodging = () => {
    window.location.assign(`/viewLodging/${params.locationId}/${params.tripId}`);
  };

  return (
    <div id={params.locationId} className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-8 text-3xl font-bold">
        Selections in {data.location.city}, {data.location.state}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={ViewFood}>
          View Food
        </button>
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={ViewTransportation}>
          View Transportation
        </button>
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={ViewThingsToDo}>
          View Things to Do
        </button>
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={ViewLodging}>
          View Lodging
        </button>
      </div>
      <div>
        <h2 className="mt-8 text-2xl font-bold">This Trip</h2>
        {trip.loading ? <div className="spinner"></div> : <TripById trip={tripData} />}
      </div>
    </div>
  );
};

export default ViewSelection;
