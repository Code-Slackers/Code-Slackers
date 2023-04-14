import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TRIPSBYLOCATION } from "../utils/queries";
import TripsByLocation from "../components/TripsByLocation/index.js";

const ViewTripsByLocation = () => {
  const { locationId } = useParams();
  const { loading, data } = useQuery(QUERY_TRIPSBYLOCATION, {
    variables: { locationId: locationId },
  });

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
        <button onClick={newTripHandler} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">ADD NEW TRIP</button>
      </div>
    );
  }

  return (
    <div id={locationId} className="flex flex-col items-center">
      <h1 className="mb-8 text-3xl font-semibold text-gray-800">Trips in {trips[0].state}</h1>
      <div className="w-full">
        <button onClick={newTripHandler} className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">ADD NEW TRIP</button>
        <div>{loading ? <div>Loading...</div> : <TripsByLocation trips={trips} />}</div>
      </div>
    </div>
  );
};

export default ViewTripsByLocation;
