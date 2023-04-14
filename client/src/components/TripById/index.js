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
                <p>{food.category}</p>
                <p>{food.cost}</p>
                <p>{food.starRating}</p>
                {!food.images[0] ? (
                  ""
                ) : (
                  <div className="w-20">
                    {" "}
                    <img src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${food.images[0]}`} alt="food" />{" "}
                  </div>
                )}
                <p>{food.reviews}</p>
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
                <p>{transportation.category}</p>
                <p>{transportation.cost}</p>
                <p>{transportation.starRating}</p>
                <p>{transportation.reviews}</p>
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
                <p>{thingsToDo.category}</p>
                <p>{thingsToDo.cost}</p>
                <p>{thingsToDo.starRating}</p>
                {!thingsToDo.images[0] ? (
                  ""
                ) : (
                  <div className="w-20">
                    {" "}
                    <img src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${thingsToDo.images[0]}`} alt="food" />{" "}
                  </div>
                )}
                <p>{thingsToDo.reviews}</p>
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
                <p>{lodging.category}</p>
                <p>{lodging.cost}</p>
                <p>{lodging.starRating}</p>
                {!lodging.images[0] ? (
                  ""
                ) : (
                  <div className="w-20">
                    {" "}
                    <img src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${lodging.images[0]}`} alt="food" />{" "}
                  </div>
                )}
                <p>{lodging.reviews}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TripById;
