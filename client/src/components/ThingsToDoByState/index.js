import { useMutation } from "@apollo/client";
import React from "react";
import { UPDATE_TRIP } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const ThingsToDoByState = ({ thingsToDo }) => {
  const { tripId } = useParams();
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
    } catch (error) {
      console.error(error);
    }
  };

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
            {!thingToDo.images[0] ? (
              ""
            ) : (
              <div className="w-20">
                {" "}
                <img src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${thingToDo.images[0]}`} alt="food" />{" "}
              </div>
            )}
            <button
              onClick={() => {
                addThingsToDoToTrip(thingToDo._id);
              }}
            >
              ADD THING TO DO TO TRIP
            </button>
          </div>
        ))}
    </div>
  );
};

export default ThingsToDoByState;
