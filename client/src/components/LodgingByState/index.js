import { useMutation } from "@apollo/client";
import React from "react";
import { UPDATE_TRIP } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const LodgingByState = ({ lodgings }) => {
  const { tripId } = useParams();
  const [addLodging, { error }] = useMutation(UPDATE_TRIP);
  if (!lodgings.length) {
    return <h3>No Lodging Yet</h3>;
  }

  const addLodgingToTrip = async (lodgingId) => {
    try {
      const { data } = await addLodging({
        variables: { tripId: tripId, lodging: lodgingId },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {lodgings &&
        lodgings.map((lodging) => (
          <div key={lodging._id} id={lodging._id} className="p-2 m-0 card-header bg-primary text-light m-2">
            <div className="mb-3 card">
              <h4>{lodging.category}</h4>
            </div>
            <div>
              {lodging.address} {lodging.state}
            </div>
            <div>
              {lodging.cost} {lodging.starRating}
            </div>
            {!lodging.images.length ? null : <img src={lodging.images[0]} alt="lodging" />}
            <button
              onClick={() => {
                addLodgingToTrip(lodging._id);
              }}
            >
              ADD LODGING TO TRIP
            </button>
          </div>
        ))}
    </div>
  );
};

export default LodgingByState;
