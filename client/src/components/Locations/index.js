import React from "react";
import { Link } from "react-router-dom";

const LocationList = ({ locations }) => {
  if (!locations.length) {
    return <h3>No Locations Yet</h3>;
  }

  const viewLocationHandler = (event) => {
    const locationId = event.target.closest(".card").id;
    window.location.assign(`/selectedLocation/${locationId}`);
  };

  return (
    <div>
      <h3>Locations in {locations[0].state}</h3>
      {locations &&
        locations.map((location) => (
          <div key={location._id} id={location._id} className="mb-3 card" onClick={viewLocationHandler}>
            <h4 className="p-2 m-0 card-header bg-primary text-light">
              {location.city} {location.state} <br />
            </h4>
          </div>
        ))}
    </div>
  );
};

export default LocationList;