import { useQuery } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FoodByState from "../components/FoodByState/index.js";
import { QUERY_FOODBYSTATE } from "../utils/queries";
const ViewFood = () => {
  const loca = useLocation();
  const navigate = useNavigate();
  const { locationId, tripId } = useParams();
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
  const location = data?.location || [];
  const addFoodHandler = () => {
    window.location.assign(`/addFood`);
  };

  if (!foods.length) {
    return (
      <div className="container px-4 mx-auto mt-8">
        <h3 className="text-2xl font-bold text-center">No Food Yet</h3>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            onClick={addFoodHandler}
          >
            ADD FOOD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto my-10">
      <div className="flex justify-between items-center flex-wrap gap-4 w-full">
        <h1 className="text-3xl font-bold">
          {location.city}, {location.state} Food
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
          onClick={addFoodHandler}
        >
          ADD FOOD
        </button>
      </div>
      <div className="w-full mt-10 ">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <FoodByState foods={foods} trip={tripId} />
        )}
      </div>
    </div>
  );
};

export default ViewFood;
