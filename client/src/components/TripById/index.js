import React from "react";
import { useParams } from "react-router-dom";

const TripById = (trip) => {
  console.log("TRIP", trip.trip.food);
  const params = useParams();
  const ViewFood = () => {
    window.location.assign(`/viewFood/${params.locationId}/${params.tripId}`);
  };

  const ViewTransportation = () => {
    window.location.assign(
      `/viewTransportation/${params.locationId}/${params.tripId}`
    );
  };

  const ViewThingsToDo = () => {
    window.location.assign(
      `/viewThingsToDo/${params.locationId}/${params.tripId}`
    );
  };

  const ViewLodging = () => {
    window.location.assign(
      `/viewLodging/${params.locationId}/${params.tripId}`
    );
  };
  if (!trip) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-3xl font-semibold text-gray-800">No Trips Yet</h3>
      </div>
    );
  }
  return (
    <>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {trip.trip.dateOfTrip}
      </div>
    

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
                    <img
                      src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${food.images[0]}`}
                      alt="food"
                    />{" "}
                  </div>
                )}
                <p>{food.reviews}</p>
              </div>
            ))}
          </div>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={ViewFood}
          >
            Add or Update
          </button>
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
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={ViewTransportation}
          >
            Add or Update
          </button>
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
                    <img
                      src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${thingsToDo.images[0]}`}
                      alt="food"
                    />{" "}
                  </div>
                )}
                <p>{thingsToDo.reviews}</p>
              </div>
            ))}
          </div>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={ViewThingsToDo}
          >
            Add or Update
          </button>
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
                    <img
                      src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${lodging.images[0]}`}
                      alt="food"
                    />{" "}
                  </div>
                )}
                <p>{lodging.reviews}</p>
              </div>
            ))}
          </div>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={ViewLodging}
          >
            Add or Update
          </button>
        </div>

      
    </>
  );
};

export default TripById;
