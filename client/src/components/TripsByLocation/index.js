import React from "react";

const TripsByLocation = ({ trips }) => {
  console.log(trips);
  if (!trips.length) {
    return <h3>No Trips Yet</h3>;
  }

  return (
    <div>
      {trips &&
        trips.map((trip) => (
          <div key={trip._id} id={trip._id} className="p-2 m-0 card-header bg-primary text-light m-2">
            <div className="mb-3 card">
              <h4>{trip.dateOfTrip}</h4>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TripsByLocation;
