import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_THINGSTODOBYSTATE } from "../utils/queries";
import ThingsToDoByState from "../components/ThingsToDoByState/index.js";

const ViewThingsToDo = () => {
  const { locationId } = useParams();
  const { loading, data } = useQuery(QUERY_THINGSTODOBYSTATE, {
    variables: { locationId: locationId },
  });

  const thingsToDo = data?.location.thingsToDo || [];

  const addThingsToDoHandler = () => {
    window.location.assign(`/addThingsToDo`);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-800">Things To Do in {thingsToDo[0]?.state}</h1>
          </div>
          <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
            {loading ? (
              <div>Loading...</div>
            ) : thingsToDo.length ? (
              <ThingsToDoByState thingsToDo={thingsToDo} />
            ) : (
              <div className="flex flex-col items-center py-12">
                <h3 className="mb-4 text-xl font-bold text-gray-800">No Things To Do Yet</h3>
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={addThingsToDoHandler}
                >
                  Add Things To Do
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewThingsToDo;
