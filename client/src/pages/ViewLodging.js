import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LodgingByState from "../components/LodgingByState/index.js";
import { QUERY_LODGINGBYSTATE } from "../utils/queries";

const ViewLodging = () => {
  const { locationId } = useParams();
  const lctn = useLocation();
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
  const addLodgingHandler = () => {
    window.location.assign(`/addLodging`);
  };

  return (
    <main className="min-h-screen">
      <div className=" py-12 mx-auto max-w-screen-md ">
        <div className=" ">
          <div className=" py-5   flex justify-between items-center flex-wrap gap-4 w-full">
            <h1 className="text-3xl font-bold text-gray-800">
              Lodging in {location.city}
            </h1>
            {lctn.pathname !== "/" && (
              <button
                className="px-4 py-2 text-white bg-black rounded-lg hover:bg-primary transition-all hover:text-white flex items-center gap-2 "
                onClick={() => navigate(-1)}
              >
                <ArrowLongLeftIcon className="w-5 h-5" />
                Back
              </button>
            )}
          </div>
          <div className="px-4 py-5  sm:p-0">
            {loading ? (
              <div className="text-center text-lg font-medium">Loading...</div>
            ) : lodgings.length ? (
              <>
                <LodgingByState lodgings={lodgings} />
                <div className="my-12 text-center">
                  <p>Have something in mind you don't see here?</p>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button
                    className="px-4 py-2 text-black bg-secondary rounded hover:bg-brand-yellow"
                    onClick={addLodgingHandler}
                  >
                    ADD LODGING
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center py-12 px-4">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  No Lodging Yet
                </h3>
                <button
                  className="px-4 py-2 text-white bg-black rounded hover:bg-primary"
                  onClick={addLodgingHandler}
                >
                  ADD LODGING
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewLodging;
