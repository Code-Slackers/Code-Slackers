import React from "react";
import { useParams } from "react-router-dom";

const ViewSelection = () => {
  const params = useParams();

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
      <h1 className="mb-8 text-3xl font-bold">View Selection</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={ViewFood}>View Food</button>
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={ViewTransportation}>View Transportation</button>
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={ViewThingsToDo}>View Things to Do</button>
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={ViewLodging}>View Lodging</button>
      </div>
    </div>
  );
};

export default ViewSelection;
