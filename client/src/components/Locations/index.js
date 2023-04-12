import React from "react";
// TODO: Add code to import necessary component for creating internal hyperlinks
import { Link } from "react-router-dom";

const LocationList = ({ locations }) => {
  if (!locations.length) {
    return <h3>No Locations Yet</h3>;
  }

  return (
    <div>
      <h3>Your locations are</h3>
      {locations &&
        locations.map((location) => (
          <div key={location._id} id={location._id} className="mb-3 card">
            <h4 className="p-2 m-0 card-header bg-primary text-light">
              {location.city}
              {location.state} <br />
            </h4>
          </div>
        ))}
    </div>
  );
};

export default LocationList;
