import React from "react";

const ThingsToDoByState = ({ thingsToDo }) => {
  if (!thingsToDo.length) {
    return <h3>No Things To Do Yet</h3>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {thingsToDo &&
        thingsToDo.map((thingToDo) => (
          <div key={thingToDo._id} id={thingToDo._id} className="p-4 mx-4 my-2 bg-white rounded-lg shadow-lg w-96">
            <div className="mb-3 card">
              <h4 className="text-2xl font-bold">{thingToDo.category}</h4>
            </div>
            <div className="mb-2 text-lg">
              {thingToDo.address} {thingToDo.state}
            </div>
            <div className="mb-4 text-lg">
              {thingToDo.cost} {thingToDo.starRating}
            </div>
            {!thingToDo.images.length ? null : <img className="w-full rounded-md" src={thingToDo.images[0]} alt="thingToDo" />}
            <button className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">ADD THING TO DO TO TRIP</button>
          </div>
        ))}
    </div>
  );
};

export default ThingsToDoByState;
