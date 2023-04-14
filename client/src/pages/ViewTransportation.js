import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TRANSPORTATIONBYSTATE } from "../utils/queries";
import TransportationByState from "../components/TransportationByState/index.js";

const ViewTransportation = () => {
  const { locationId } = useParams();
  const { loading, data } = useQuery(QUERY_TRANSPORTATIONBYSTATE, {
    variables: { locationId: locationId },
  });
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }
  const transportations = data?.location.transportation || [];
  const location = data?.location || [];

  const addTransportationHandler = () => {
    window.location.assign(`/addTransportation`);
  };

  if (!transportations.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h3 className="mb-4 text-3xl font-bold text-center">No Transportation Yet</h3>
        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={addTransportationHandler}>
          ADD TRANSPORTATION
        </button>
      </div>
    );
  }

  return (
    <div id={locationId} className="flex flex-col items-center">
      <h1 className="mb-8 text-3xl font-bold">
        Transportation in {location.city}, {location.state}
      </h1>
      <div className="flex flex-col items-center">
        <button className="px-4 py-2 mb-8 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={addTransportationHandler}>
          ADD TRANSPORTATION
        </button>
        <div>{loading ? <div>Loading...</div> : <TransportationByState transportations={transportations} />}</div>
      </div>
    </div>
  );
};

export default ViewTransportation;
