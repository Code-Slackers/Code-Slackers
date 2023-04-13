import React from "react";

const ThingsToDoByState = ({ thingsToDo }) => {
  if (!thingsToDo.length) {
    return (
      <div className="mt-5 text-center">
        <h3>No Things To Do Yet</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {thingsToDo &&
        thingsToDo.map((thingToDo) => (
          <div key={thingToDo._id} id={thingToDo._id} className="bg-white rounded-lg shadow-lg">
            <div className="h-56">
              {!thingToDo.images.length ? null : <img className="object-cover w-full h-full rounded-t-lg" src={thingToDo.images[0]} alt="thingToDo" />}
            </div>
            <div className="p-6">
              <h4 className="mb-2 text-xl font-bold">{thingToDo.category}</h4>
              <p className="mb-2 text-lg text-gray-700">{thingToDo.address} {thingToDo.state}</p>
              <p className="mb-4 text-lg text-gray-700">{thingToDo.cost} {thingToDo.starRating}</p>
              <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700">ADD THING TO DO TO TRIP</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThingsToDoByState;
