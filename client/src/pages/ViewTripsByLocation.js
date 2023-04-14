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
    return <div>Loading...</div>;
  }
  const trips = data?.location.trips || [];
  console.log("trips", trips);

  const newTripHandler = () => {
    window.location.assign(`/addTrip/${locationId}`);
  };

  if (!trips.length) {
    return (
      <>
        <h3>No Trips Yet</h3>
        <button onClick={newTripHandler}>ADD NEW TRIP</button>
      </>
    );
  }

  return (
    <div id={locationId} className="flex flex-col">
      <h1>Trips in {trips[0].state}</h1>
      <div>
        <button onClick={newTripHandler}>ADD NEW TRIP</button>
        <div>{loading ? <div>Loading...</div> : <TripsByLocation trips={trips} />}</div>
      </div>
    </div>
  );
};

export default ViewTripsByLocation;
