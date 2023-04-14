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
          <div
            key={location._id}
            id={location._id}
            className="mb-3 card"
            onClick={viewLocationHandler}
          >
            <div className="p-2 m-0 card-header border rounded-lg text-light flex">
              {!location.images[0] ? (
                ""
              ) : (
                <div className="w-20 h-20">
                  {" "}
                  <img
                    src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${location.images[0]}`}
                    alt="food"
                  />
                </div>
              )}
              <h4 className="p-2 m-0 card-header text-light">
                {location.city} <br />
              </h4>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LocationList;
