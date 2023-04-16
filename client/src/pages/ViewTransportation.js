import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TransportationByState from "../components/TransportationByState/index.js";
import { QUERY_TRANSPORTATIONBYSTATE } from "../utils/queries";

const ViewTransportation = () => {
  const locati = useLocation();
  const navigate = useNavigate();
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
      <div className="max-w-screen-md mx-auto">
        <h3 className="mb-4 text-3xl font-bold text-center">
          No Transportation Yet
        </h3>
        <button
          className="px-4 py-2 text-white bg-black rounded hover:bg-primary"
          onClick={addTransportationHandler}
        >
          ADD TRANSPORTATION
        </button>
      </div>
    );
  }

  return (
    <div id={locationId} className="max-w-screen-md mx-auto py-6">
      <div className="flex justify-between items-center flex-wrap gap-4 w-full mb-8 ">
        <h1 className="text-3xl font-bold">
          Transportation in {location.city}
        </h1>
        {locati.pathname !== "/" && (
          <button
            className="px-4 py-2 text-white bg-black rounded-lg hover:bg-primary transition-all hover:text-white flex items-center gap-2 "
            onClick={() => navigate(-1)}
          >
            <ArrowLongLeftIcon className="w-5 h-5" />
            Back
          </button>
        )}
      </div>
      <div className="max-w-screen-md mx-auto">
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TransportationByState transportations={transportations} />
          )}
        </div>
        <div className="my-8 text-center">
          <p>Have something in mind you don't see here?</p>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="px-4 py-2 text-black bg-secondary rounded-md hover:bg-brand-yellow"
            onClick={addTransportationHandler}
          >
            ADD TRANSPORTATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTransportation;
