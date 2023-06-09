import { useMutation } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_TRIP } from "../../utils/mutations";

const LodgingByState = ({ lodgings }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [addLodging, { error }] = useMutation(UPDATE_TRIP);

  if (!lodgings.length) {
    return (
      <div className="my-6 text-lg font-semibold text-center text-gray-500">
        No Lodging Yet
      </div>
    );
  }

  const addLodgingToTrip = async (lodgingId) => {
    try {
      const { data } = await addLodging({
        variables: { tripId: tripId, lodging: lodgingId },
      });
      console.log(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
      {lodgings.map((lodging) => (
        <div
          key={lodging._id}
          id={lodging._id}
          className="p-4 space-y-6 border border-gray-200 rounded-md shadow-lg sm:p-6"
        >
          <div className="card">
            <h4 className="mb-2 text-lg font-semibold text-primary">
              {lodging.category}
            </h4>
          </div>
          <div className="text-gray-600 ">
            <p>
              {lodging.address} {lodging.state}
            </p>
            <p>{lodging.cost} </p>
            <p className="text-3xl text-brand-yellow">{lodging.starRating}</p>
          </div>

          {lodging.images[0] ? (
            <div className="w-full mb-2">
              <img
                src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${lodging.images[0]}`}
                alt="lodging"
                className="w-full rounded-md h-[250px] object-cover"
              />
            </div>
          ) : null}
          <button
            className="block w-full px-4 py-2 text-white rounded-md bg-black hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
            onClick={() => {
              addLodgingToTrip(lodging._id);
            }}
          >
            ADD TO TRIP
          </button>
        </div>
      ))}
    </div>
  );
};

export default LodgingByState;
