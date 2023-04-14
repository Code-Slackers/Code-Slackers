import React from "react";

const ThingsToDoByState = ({ thingsToDo }) => {
  if (!thingsToDo.length) {
    return <h3>No Things To Do Yet</h3>;
  }

  return (
    <div>
      {thingsToDo &&
        thingsToDo.map((thingToDo) => (
          <div key={thingToDo._id} id={thingToDo._id} className="p-2 m-0 card-header bg-primary text-light m-2">
            <div className="mb-3 card">
              <h4>{thingToDo.category}</h4>
            </div>
            <div>
              {thingToDo.address} {thingToDo.state}
            </div>
            <div>
              {thingToDo.cost} {thingToDo.starRating}
            </div>
            {!thingToDo.images.length ? null : <img src={thingToDo.images[0]} alt="thingToDo" />}
            <button>ADD THING TO DO TO TRIP</button>
          </div>
        ))}
    </div>
  );
};

export default ThingsToDoByState;
