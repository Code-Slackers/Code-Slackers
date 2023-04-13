import React from "react";

const FoodByState = ({ foods }) => {
  console.log(foods);
  if (!foods.length) {
    return <h3>No Foods Yet</h3>;
  }

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
            <button>ADD FOOD TO TRIP</button>
          </div>
        ))}
    </div>
  );
};

export default FoodByState;
