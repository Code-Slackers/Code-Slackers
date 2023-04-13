import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LODGINGBYSTATE } from "../utils/queries";
import LodgingByState from "../components/LodgingByState/index.js";

const ViewLodging = () => {
  const { locationId } = useParams();
  const { loading, data } = useQuery(QUERY_LODGINGBYSTATE, {
    variables: { locationId: locationId },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  const lodgings = data?.location.lodging || [];
  console.log(lodgings);
  const addLodgingHandler = () => {
    window.location.assign(`/addLodging`);
  };

  if (!lodgings.length) {
    return (
      <>
        <h3>No Lodging Yet</h3>
        <button onClick={addLodgingHandler}>ADD LODGING</button>
      </>
    );
  }

  return (
    <div id={locationId} className="flex flex-col">
      <h1>Lodging in {lodgings[0].state}</h1>
      <div>
        <button onClick={addLodgingHandler}>ADD LODGING</button>
        <div>{loading ? <div>Loading...</div> : <LodgingByState lodgings={lodgings} />}</div>
      </div>
    </div>
  );
};

export default ViewLodging;
