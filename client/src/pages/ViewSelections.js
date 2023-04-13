import React from "react";
import { useParams } from "react-router-dom";

const ViewSelection = () => {
  const params = useParams();

  const ViewFood = () => {
    window.location.assign(`/viewFood/${params.locationId}`);
  };

  const ViewTransportation = () => {
    window.location.assign(`/viewTransportation/${params.locationId}`);
  };

  const ViewThingsToDo = () => {
    window.location.assign(`/viewThingsToDo/${params.locationId}`);
  };

  const ViewLodging = () => {
    window.location.assign(`/viewLodging/${params.locationId}`);
  };

  return (
    <div className="container px-4 mx-auto mt-8">
      <h1 className="text-3xl font-bold">{params.locationId} Selections</h1>
      <div className="flex flex-col items-center justify-center mt-4 sm:flex-row">
        <button className="px-4 py-2 mb-2 text-white bg-blue-500 rounded-md sm:mr-2 sm:mb-0" onClick={ViewFood}>VIEW FOOD</button>
        <button className="px-4 py-2 mb-2 text-white bg-blue-500 rounded-md sm:mr-2 sm:mb-0" onClick={ViewTransportation}>VIEW TRANSPORTATION</button>
        <button className="px-4 py-2 mb-2 text-white bg-blue-500 rounded-md sm:mr-2 sm:mb-0" onClick={ViewThingsToDo}>VIEW THINGS TO DO</button>
        <button className="px-4 py-2 mb-2 text-white bg-blue-500 rounded-md sm:mr-2 sm:mb-0" onClick={ViewLodging}>VIEW LODGING</button>
      </div>
    </div>
  );
};

export default ViewSelection;
