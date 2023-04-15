import React from "react";
import { useParams } from "react-router-dom";

const TripsByLocation = ({ trips }) => {
  console.log(trips);
  const { locationId } = useParams();

  if (!trips.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-3xl font-semibold text-gray-800">No Trips Yet</h3>
      </div>
    );
  }

  const viewTrip = (tripId) => {
    window.location.assign(`/selectedlocation/${locationId}/${tripId}`);
  };

  return ( 
    <div className="mx-auto max-w-screen-md mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {trips &&
          trips.map((trip) => (
            <div
              key={trip._id}
              id={trip._id}
              className="p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md w-full cursor-pointer"
              onClick={() => {
                viewTrip(trip._id);
              }}
            >
              <div className="mb-3 card">
                <h4 className="text-xl font-bold">{trip.dateOfTrip}</h4>
              </div>
              <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700">
                CHECK IT OUT
              </button>
            </div>
          ))}
     </div>
      </div> 
  );
};

export default TripsByLocation;
