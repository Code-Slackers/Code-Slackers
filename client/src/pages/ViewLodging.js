import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LodgingByState from "../components/LodgingByState/index.js";
import { QUERY_LODGINGBYSTATE } from "../utils/queries";
const ViewLodging = () => {
  const { locationId } = useParams();
  const loca = useLocation();
  const navigate = useNavigate();
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
  const location = data?.location || [];
  console.log(lodgings);

  const addLodgingHandler = () => {
    window.location.assign(`/addLodging`);
  };

  if (!lodgings.length) {
    return (
      <div className="container px-4 mx-auto mt-8">
        <h3 className="text-2xl font-bold text-center">No Lodging Yet</h3>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            onClick={addLodgingHandler}
          >
            ADD LODGING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto mt-8 mb-12">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold">
          {location.city}, {location.state} Lodging
        </h1>
        {loca.pathname !== "/" && (
          <button
            className="px-4 py-2 text-black bg-secondary rounded-lg hover:bg-brand-yellow transition-all hover:text-white flex items-center gap-2 "
            onClick={() => navigate(-1)}
          >
            <ArrowLongLeftIcon className="w-5 h-5" />
            Back
          </button>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={addLodgingHandler}
        >
          ADD LODGING
        </button>
      </div>
      <div className="mt-8">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <LodgingByState lodgings={lodgings} />
        )}
      </div>
    </div>
  );
};

export default ViewLodging;
