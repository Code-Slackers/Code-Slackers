import React from "react";

const TransportationByState = ({ transportations }) => {
  console.log(transportations);
  if (!transportations.length) {
    return <h3>No Transportation Yet</h3>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {transportations &&
        transportations.map((transportation) => (
          <div key={transportation._id} id={transportation._id} className="p-2 m-0 m-2 card-header bg-primary text-light w-80 md:w-96">
            <div className="mb-3 card">
              <h4 className="text-xl font-bold">{transportation.category}</h4>
            </div>
            <div className="my-2">
              <span className="font-bold">Address: </span>{transportation.address}, {transportation.state}
            </div>
            <button className="px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800" onClick={() => alert("Transportation added to trip!")}>ADD TRANSPORTATION TO TRIP</button>
          </div>
        ))}
    </div>
  );
};

export default TransportationByState;
