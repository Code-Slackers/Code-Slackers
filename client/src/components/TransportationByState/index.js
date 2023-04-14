import React from "react";

const TransportationByState = ({ transportations }) => {
  console.log(transportations);
  if (!transportations.length) {
    return <h3>No Transportation Yet</h3>;
  }

  return (
    <div>
      {transportations &&
        transportations.map((transportation) => (
          <div key={transportation._id} id={transportation._id} className="p-2 m-0 card-header bg-primary text-light m-2">
            <div className="mb-3 card">
              <h4>{transportation.category}</h4>
            </div>
            <div>
              {transportation.address} {transportation.state}
            </div>
            <button>ADD transportation TO TRIP</button>
          </div>
        ))}
    </div>
  );
};

export default TransportationByState;
