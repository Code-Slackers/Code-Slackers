import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddTransportationForm from "../components/AddTransportationForm";
import { QUERY_LOCATIONS } from "../utils/queries";
const AddTransportation = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <main className="max-w-screen-md mx-auto mb-14">
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full">
          <div className="px-6 py-4 text-white bg-primary flex justify-between items-center flex-wrap gap-4 w-full">
            <h1 className="text-2xl font-bold">Add Transportation</h1>
            {location.pathname !== "/" && (
              <button
                className="px-4 py-2 text-white bg-black rounded-lg hover:bg-primary transition-all hover:text-white flex items-center gap-2 "
                onClick={() => navigate(-1)}
              >
                <ArrowLongLeftIcon className="w-5 h-5" />
                Back
              </button>
            )}
          </div>
          <div className="px-6 py-8 bg-white rounded-lg shadow-lg">
            {loading ? (
              <div className="text-center text-lg font-medium">Loading...</div>
            ) : (
              <AddTransportationForm locations={locations} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddTransportation;
