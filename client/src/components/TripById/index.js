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
      <div className="mt-2">
        {trip.trip.dateOfTrip}
      </div>
     
    <div className="grid grid-cols-1 gap-6 mt-8 mb-8 md:grid-cols-2">
      <div className="p-4 space-y-4 transition-all border card sm:p-6 hover:shadow-md hover:bg-neutral-100">
          <h1>Food</h1>
          <div className="space-y-4">
            {trip.trip.food.map((food) => (
              <div key={food._id} className="space-y-2">
                <p className="font-medium">{food.address}</p>
                <p className="font-medium">{food.phone}</p>
                <p className="font-medium">{food.category}</p>
                <p className="font-medium">{food.cost}</p>
                <p className="text-3xl text-brand-yellow">{food.starRating}</p>
                {!food.images[0] ? (
                  ""
                ) : (
                  <div className=""> 
                    <img className="w-full h-[250px] object-cover"
                      src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${food.images[0]}`}
                      alt="food"
                    /> 
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
        <div className="flex flex-col justify-between p-4 space-y-4 transition-all border hover:bg-neutral-100 card hover:shadow-md sm:p-6">
          <div className="space-y-4">
          
          <h1>Transportation</h1>
          <div>
            {trip.trip.transportation.map((transportation) => (
              <div key={transportation._id} className="space-y-2">
                <p className="font-medium">{transportation.address}</p>
                <p className="font-medium">{transportation.phone}</p>
                <p className="font-medium">{transportation.category}</p>
                <p className="font-medium">{transportation.cost}</p>
                <p className="font-medium">{transportation.starRating}</p>
                <p className="text-3xl text-brand-yellow">{transportation.reviews}</p>
              </div>
            ))}
          </div>
          </div>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={ViewTransportation}
          >
            Add or Update
          </button>
        </div>
        <div className="p-4 space-y-4 transition-all border card hover:shadow-md hover:bg-neutral-100 sm:p-6">
          <h1>Things To Do</h1>
          <div>
            {trip.trip.thingsToDo.map((thingsToDo) => (
              <div key={thingsToDo._id} className="space-y-2">
                <p className="font-medium">{thingsToDo.address}</p>
                <p className="font-medium">{thingsToDo.phone}</p>
                <p className="font-medium">{thingsToDo.category}</p>
                <p className="font-medium">{thingsToDo.cost}</p>
                <p className="text-3xl text-brand-yellow">{thingsToDo.starRating}</p>
                {!thingsToDo.images[0] ? (
                  ""
                ) : (
                  <div > 
                    <img className="w-full h-[250px] object-cover"
                      src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${thingsToDo.images[0]}`}
                      alt="food"
                    /> 
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
        <div className="p-4 space-y-4 transition-all border card hover:bg-neutral-100 hover:shadow-md sm:p-6">
          <h1>Lodging</h1>
          <div>
            {trip.trip.lodging.map((lodging) => (
              <div key={lodging._id} className="space-y-2">
                <p className="font-medium ">{lodging.address}</p>
                <p className="font-medium ">{lodging.phone}</p>
                <p className="font-medium ">{lodging.category}</p>
                <p className="font-medium ">{lodging.cost}</p>
                <p className="text-3xl text-brand-yellow">{lodging.starRating}</p>
                {!lodging.images[0] ? (
                  ""
                ) : (
                  <div > 
                    <img className="w-full h-[250px] object-cover"
                      src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${lodging.images[0]}`}
                      alt="food"
                    /> 
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
    </div>

      
    </>
  );
};

export default TripById;
