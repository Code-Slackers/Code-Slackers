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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  const lodgings = data?.location.lodging || [];
  console.log(lodgings);

  const addLodgingHandler = () => {
    window.location.assign(`/addLodging`);
  };

  if (!lodgings.length) {
    return (
      <div className="container px-4 mx-auto mt-8">
        <h3 className="text-2xl font-bold text-center">No Lodging Yet</h3>
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={addLodgingHandler}>
            ADD LODGING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto mt-8">
      <h1 className="text-3xl font-bold">{lodgings[0].state} Lodging</h1>
      <div className="flex items-center justify-between mt-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={addLodgingHandler}>
          ADD LODGING
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">{loading ? <div className="spinner"></div> : <LodgingByState lodgings={lodgings} />}</div>
    </div>
  );
};

export default ViewLodging;
