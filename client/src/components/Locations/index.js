import React from "react";
import { Link } from "react-router-dom";

const LocationList = ({ locations }) => {
  if (!locations.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-3xl font-semibold text-gray-800">No Locations Yet</h3>
      </div>
    );
  }

  const viewLocationHandler = (event) => {
    const locationId = event.target.closest(".card").id;
    window.location.assign(`/selectedLocation/${locationId}`);
  };

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h3 className="mb-8 text-3xl font-semibold text-gray-800">Locations in {locations[0].state}</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {locations &&
          locations.map((location) => (
            <div key={location._id} id={location._id} className="rounded-lg shadow-md cursor-pointer card" onClick={viewLocationHandler}>
              <div className="relative">
                <img src={location.images[0]} alt={location.city} className="object-cover w-full h-48 rounded-t-lg sm:h-56 md:h-64" />
                <div className="absolute inset-0 bg-black rounded-t-lg opacity-30"></div>
                <div className="absolute inset-x-0 bottom-0 px-4 py-2">
                  <h4 className="text-xl font-semibold text-white">
                    {location.city}, {location.state}
                  </h4>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LocationList;
