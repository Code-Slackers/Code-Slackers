import React from "react";
import AddTransportationForm from "../components/AddTransportationForm";
import { useQuery } from "@apollo/client";
import { QUERY_LOCATIONS } from "../utils/queries";

const AddTransportation = () => {
  const { loading, data } = useQuery(QUERY_LOCATIONS);
  const locations = data?.locations || [];

  return (
    <main className="container px-4 mx-auto">
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full md:w-1/2">
          <div className="px-6 py-4 text-white bg-blue-500">
            <h1 className="text-2xl font-bold">Add Transportation</h1>
          </div>
          <div className="px-6 py-8 bg-white rounded-lg shadow-lg">
            {loading ? (
              <div className="text-center">Loading...</div>
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
