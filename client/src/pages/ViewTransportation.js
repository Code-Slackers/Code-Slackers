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
    return <div>Loading...</div>;
  }
  const transportations = data?.location.transportation || [];

  const addTransportationHandler = () => {
    window.location.assign(`/addTransportation`);
  };

  if (!transportations.length) {
    return (
      <>
        <h3>No Transportation Yet</h3>
        <button onClick={addTransportationHandler}>ADD TRANSPORTATION</button>
      </>
    );
  }

  return (
    <div id={locationId} className="flex flex-col">
      <h1>Transportation in {transportations[0].state}</h1>
      <div>
        <button onClick={addTransportationHandler}>ADD TRANSPORTATION</button>
        <div>{loading ? <div>Loading...</div> : <TransportationByState transportations={transportations} />}</div>
      </div>
    </div>
  );
};

export default ViewTransportation;
