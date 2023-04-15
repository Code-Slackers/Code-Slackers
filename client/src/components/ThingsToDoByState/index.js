import { useMutation } from "@apollo/client";
import React from "react";
import { UPDATE_TRIP } from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";

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
    <div>
      {thingsToDo &&
        thingsToDo.map((thingToDo) => (
          <div
            key={thingToDo._id}
            id={thingToDo._id}
            className="p-2 m-0 m-2 rounded-md shadow-md card-header bg-primary text-light"
          >
            <div className="mb-3 card">
              <h4 className="text-lg font-medium">{thingToDo.category}</h4>
            </div>
            <div className="mb-2">
              <p className="text-sm">{thingToDo.address} {thingToDo.state}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm">{thingToDo.cost} {thingToDo.starRating}</p>
              {!thingToDo.images[0] ? (
                ""
              ) : (
                <div className="w-20">
                  {" "}
                  <img
                    src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${thingToDo.images[0]}`}
                    alt="food"
                  />{" "}
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
