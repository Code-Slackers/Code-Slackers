import React from "react";

const LodgingByState = ({ lodgings }) => {
  if (!lodgings.length) {
    return (
      <div className="mt-5 text-center">
        <h3 className="text-2xl font-bold">No Lodging Yet</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {lodgings &&
        lodgings.map((lodging) => (
          <div key={lodging._id} id={lodging._id} className="overflow-hidden bg-white rounded-lg shadow-lg">
            <img src={lodging.images[0]} className="object-cover w-full h-48" alt="lodging" />
            <div className="p-4">
              <h5 className="mb-2 text-lg font-bold">{lodging.category}</h5>
              <p className="mb-2 text-gray-600">
                {lodging.address} {lodging.state}
              </p>
              <p className="mb-4 text-gray-600">
                {lodging.cost} {lodging.starRating}
              </p>
              <button className="block w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
                ADD LODGING TO TRIP
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LodgingByState;
