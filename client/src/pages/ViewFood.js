import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_FOODBYSTATE } from "../utils/queries";
import FoodByState from "../components/FoodByState/index.js";

const ViewFood = () => {
  const { locationId } = useParams();
  const { loading, data } = useQuery(QUERY_FOODBYSTATE, {
    variables: { locationId: locationId },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  const foods = data?.location.food || [];

  if (!foods.length) {
    return (
      <>
        <h3>No Food Yet</h3>
        <button onClick={addFoodHandler}>ADD FOOD</button>
      </>
    );
  }

  const addFoodHandler = () => {
    window.location.assign(`/addFood`);
  };
  return (
    <div id={locationId} className="flex flex-col">
      <h1>FOOD in {foods[0].state}</h1>
      <div>
        <button onClick={addFoodHandler}>ADD FOOD</button>
        <div>{loading ? <div>Loading...</div> : <FoodByState foods={foods} />}</div>
      </div>
    </div>
  );
};

export default ViewFood;
