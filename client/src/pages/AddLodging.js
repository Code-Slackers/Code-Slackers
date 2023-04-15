import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddLodgingForm from "../components/AddLodgingForm";
import { QUERY_LOCATIONS } from "../utils/queries";
const AddLodging = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];
  const loca = useLocation();
  const navigate = useNavigate();
  return (
    <main className="container mx-auto pb-12">
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full md:w-1/2">
          <div className="px-6 py-4 text-white bg-blue-500 flex justify-between items-center flex-wrap gap-4 w-full">
            <h1 className="text-2xl font-bold">Add Lodging</h1>
            {loca.pathname !== "/" && (
            <button
              className="px-4 py-2 text-black bg-secondary rounded-lg hover:bg-brand-yellow transition-all hover:text-white flex items-center gap-2 "
              onClick={() => navigate(-1)}
            >
              <ArrowLongLeftIcon className="w-5 h-5" />
              Go Back
            </button>
          )}
          </div>
          <div className="px-6 py-8 bg-white rounded-lg shadow-lg">
            {loading ? (
              <div className="text-center text-lg font-medium">Loading...</div>
            ) : (
              <AddLodgingForm locations={locations} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddLodging;
