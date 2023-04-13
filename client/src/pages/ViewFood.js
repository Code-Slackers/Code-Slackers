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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  const foods = data?.location.food || [];

  if (!foods.length) {
    return (
      <div className="container px-4 mx-auto mt-8">
        <h3 className="text-2xl font-bold text-center">No Food Yet</h3>
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={addFoodHandler}>ADD FOOD</button>
        </div>
      </div>
    );
  }

  const addFoodHandler = () => {
    window.location.assign(`/addFood`);
  };

  return (
    <div className="container px-4 mx-auto mt-8">
      <h1 className="text-3xl font-bold">{foods[0].state} Food</h1>
      <div className="flex items-center justify-between mt-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={addFoodHandler}>ADD FOOD</button>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <FoodByState foods={foods} />
        )}
      </div>
    </div>
  );
};

export default ViewFood;
