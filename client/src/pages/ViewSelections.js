import React from "react";
import { useParams } from "react-router-dom";

const ViewSelection = () => {
  const params = useParams();

  const ViewFood = () => {
    window.location.assign(`/viewFood/${params.locationId}/${params.tripId}}`);
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
    <div id={params.locationId} className="flex flex-col">
      <button onClick={ViewFood}>VIEW FOOD</button>
      <button onClick={ViewTransportation}>VIEW TRANSPORTATION</button>
      <button onClick={ViewThingsToDo}>VIEW THINGS TO DO</button>
      <button onClick={ViewLodging}>VIEW LODGING</button>
    </div>
  );
};

export default ViewSelection;
