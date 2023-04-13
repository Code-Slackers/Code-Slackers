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
  if (loading) {
    return <div>Loading...</div>;
  }
  const thingsToDo = data?.location.thingsToDo || [];
  const addThingsToDoHandler = () => {
    window.location.assign(`/addThingsToDo`);
  };

  if (!thingsToDo.length) {
    return (
      <>
        <h3>No Things To Do Yet</h3>
        <button onClick={addThingsToDoHandler}>ADD THINGS TO DO</button>
      </>
    );
  }

  return (
    <div id={locationId} className="flex flex-col">
      <h1>Things To Do in {thingsToDo[0].state}</h1>
      <div>
        <button onClick={addThingsToDoHandler}>ADD THINGS TO DO</button>
        <div>{loading ? <div>Loading...</div> : <ThingsToDoByState thingsToDo={thingsToDo} />}</div>
      </div>
    </div>
  );
};

export default ViewThingsToDo;
