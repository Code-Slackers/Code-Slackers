import React from "react";

const FoodByState = ({ foods }) => {
  console.log(foods);

  if (!foods.length) {
    return <h3>No Foods Yet</h3>;
  }

  return (
    <div className="flex flex-wrap">
      {foods &&
        foods.map((food) => (
          <div key={food._id} id={food._id} className="p-4 m-4 bg-white rounded-lg shadow-lg w-96">
            <div className="mb-4">
              <h4 className="text-lg font-bold">{food.category}</h4>
            </div>
            <div className="mb-2 text-gray-600">
              <p>{food.address} {food.state}</p>
            </div>
            <div className="mb-2 text-gray-600">
              <p>{food.cost} {food.starRating}</p>
            </div>
            {!food.images.length ? null : <img src={food.images[0]} alt="food" className="w-full mb-2 rounded-lg shadow-lg" />}
            <button className="px-4 py-2 text-white transition-colors duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600">ADD FOOD TO TRIP</button>
          </div>
        ))}
    </div>
  );
};

export default FoodByState;
