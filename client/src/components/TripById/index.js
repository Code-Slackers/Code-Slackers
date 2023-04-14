import React from "react";

const TripById = (trip) => {
  console.log("TRIP", trip.trip.food);
  if (!trip) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-3xl font-semibold text-gray-800">No Trips Yet</h3>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{trip.trip.dateOfTrip}</div>
      <div className="flex">
        <div>
          <h1>Food</h1>
          <div>
            {trip.trip.food.map((food) => (
              <div key={food._id}>
                <p>{food.address}</p>
                <p>{food.phone}</p>
                <p>Category: {food.category}</p>
                <p>Cost: {food.cost}</p>
                <p>{food.images}</p>
                <p>{food.reviews}</p>
                {!food.starRating ? "" : <p>StarRating: {food.starRating}</p>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Transportation</h1>
          <div>
            {trip.trip.transportation.map((transportation) => (
              <div key={transportation._id}>
                <p>{transportation.address}</p>
                <p>{transportation.phone}</p>
                <p>Category: {transportation.category}</p>
                <p>Cost: {transportation.cost}</p>
                <p>{transportation.images}</p>
                <p>{transportation.reviews}</p>
                {!transportation.starRating ? "" : <p>StarRating: {transportation.starRating}</p>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Things To Do</h1>
          <div>
            {trip.trip.thingsToDo.map((thingsToDo) => (
              <div key={thingsToDo._id}>
                <p>{thingsToDo.address}</p>
                <p>{thingsToDo.phone}</p>
                <p>Category: {thingsToDo.category}</p>
                <p>Cost: {thingsToDo.cost}</p>
                <p>{thingsToDo.images}</p>
                <p>{thingsToDo.reviews}</p>
                {!thingsToDo.starRating ? "" : <p>StarRating: {thingsToDo.starRating}</p>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Lodging</h1>
          <div>
            {trip.trip.lodging.map((lodging) => (
              <div key={lodging._id}>
                <p>{lodging.address}</p>
                <p>{lodging.phone}</p>
                <p>Category: {lodging.category}</p>
                <p>Cost: {lodging.cost}</p>
                <p>{lodging.images}</p>
                <p>{lodging.reviews}</p>
                {!lodging.starRating ? "" : <p>StarRating: {lodging.starRating}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TripById;
