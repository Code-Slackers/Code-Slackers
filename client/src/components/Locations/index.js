import React from "react";
import { Link } from "react-router-dom";

const LocationList = ({ locations }) => {
  if (!locations.length) {
    return <h3>No Locations Yet</h3>;
  }

  const viewLocationHandler = (event) => {
    const locationId = event.target.closest(".card").id;
    window.location.assign(`/viewtripsbylocation/${locationId}`);
  };

  return (
    <div>
      {locations &&
        locations.map((location) => (
          <div key={location._id} id={location._id} className="mb-3 cursor-pointer card" onClick={viewLocationHandler}>
            <div className="overflow-hidden bg-gray-800 rounded-lg shadow-lg hover:bg-yellow-500">
              <div className="relative pb-60%">{!location.images[0] ? <div className="absolute inset-0 bg-gray-300"></div> : <img className="absolute inset-0 object-cover w-full h-full" src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${location.images[0]}`} alt="food" />}</div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-100">{location.city}</h4>
                <span className="text-sm text-gray-200">{location.state}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LocationList;
