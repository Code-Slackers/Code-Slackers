import { useMutation } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_TRIP } from "../../utils/mutations";

const ThingsToDoByState = ({ thingsToDo }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [addThingsToDo, { error }] = useMutation(UPDATE_TRIP);
  if (!thingsToDo.length) {
    return <h3>No Things To Do Yet</h3>;
  }

  const addThingsToDoToTrip = async (thingsToDoId) => {
    try {
      const { data } = await addThingsToDo({
        variables: { tripId: tripId, thingsToDo: thingsToDoId },
      });
      console.log(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {thingsToDo &&
        thingsToDo.map((thingToDo) => (
          <div key={thingToDo._id} id={thingToDo._id} className="p-4 space-y-4 border border-gray-200 rounded-md shadow-md sm:p-6 card-header text-light">
            <div className="mb-3 card">
              <h4 className="text-lg font-medium">{thingToDo.category}</h4>
            </div>
            <div className="mb-2">
              <p className="text-sm">
                {thingToDo.address} {thingToDo.state}
              </p>
            </div>
            <div className="pb-2 space-y-4">
              <p className="text-sm">{thingToDo.cost}</p>
              <p className="text-3xl text-brand-yellow">{thingToDo.starRating}</p>
              {!thingToDo.images[0] ? (
                ""
              ) : (
                <div>
                  <img className="h-[250px] object-cover w-full" src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${thingToDo.images[0]}`} alt="food" />
                </div>
              )}
            </div>
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              onClick={() => {
                addThingsToDoToTrip(thingToDo._id);
              }}
            >
              ADD TO TRIP
            </button>
          </div>
        ))}
    </div>
  );
};

export default ThingsToDoByState;
