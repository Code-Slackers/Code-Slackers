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
    return <div className="text-center">Loading...</div>;
  }
  const transportations = data?.location.transportation || [];

  const addTransportationHandler = () => {
    window.location.assign(`/addTransportation`);
  };

  if (!transportations.length) {
    return (
      <>
        <h3 className="text-center">No Transportation Yet</h3>
        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={addTransportationHandler}>ADD TRANSPORTATION</button>
      </>
    );
  }

  return (
    <div id={locationId} className="flex flex-col">
      <h1 className="mb-4 text-3xl font-bold">Transportation in {transportations[0].state}</h1>
      <div className="flex flex-col items-center">
        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={addTransportationHandler}>ADD TRANSPORTATION</button>
        <div>{loading ? <div>Loading...</div> : <TransportationByState transportations={transportations} />}</div>
      </div>
    </div>
  );
};

export default ViewTransportation;
