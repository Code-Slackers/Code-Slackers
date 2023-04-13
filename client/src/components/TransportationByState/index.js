import React from "react";

const TransportationByState = ({ transportations }) => {
  console.log(transportations);

  if (!transportations.length) {
    return (
      <div className="mt-5 text-center">
        <h3>No Transportation Yet</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {transportations &&
        transportations.map((transportation) => (
          <div key={transportation._id} id={transportation._id} className="p-4 m-2 bg-white rounded-lg shadow-lg w-80 md:w-96">
            <div className="mb-4">
              <h4 className="text-lg font-bold">{transportation.category}</h4>
            </div>
            <div className="mb-2 text-gray-600">
              <p className="font-bold">Address:</p>
              <p>{transportation.address}, {transportation.state}</p>
            </div>
            <button className="px-4 py-2 text-white transition-colors duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700" onClick={() => alert("Transportation added to trip!")}>ADD TRANSPORTATION TO TRIP</button>
          </div>
        ))}
    </div>
  );
};

export default TransportationByState;
