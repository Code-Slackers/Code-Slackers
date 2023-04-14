import { useMutation } from "@apollo/client";
import React from "react";
import { UPDATE_TRIP } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const FoodByState = ({ foods }) => {
  const { tripId } = useParams();
  const [addFood, { error }] = useMutation(UPDATE_TRIP);
  if (!foods.length) {
    return <h3>No Foods Yet</h3>;
  }

  const addFoodToTrip = async (foodId) => {
    console.log(tripId);
    try {
      const { data } = await addFood({
        variables: { tripId: tripId, food: foodId },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    console.log("addFoodToTrip");
  };

  return (
    <div>
      {foods &&
        foods.map((food) => (
          <div key={food._id} id={food._id} className="p-2 m-0 card-header bg-primary text-light m-2">
            <div className="mb-3 card">
              <h4>{food.category}</h4>
            </div>
            <div>
              {food.address} {food.state}
            </div>
            <div>
              {food.cost} {food.starRating}
            </div>
            {!food.images.length ? null : <img src={food.images[0]} alt="food" />}
            <button
              onClick={() => {
                addFoodToTrip(food._id);
              }}
            >
              ADD FOOD TO TRIP
            </button>
          </div>
        ))}
    </div>
  );
};

export default FoodByState;
