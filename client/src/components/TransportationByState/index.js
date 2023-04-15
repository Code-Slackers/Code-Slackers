import { useMutation } from "@apollo/client";
import React from "react";
import { UPDATE_TRIP } from "../../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";

const TransportationByState = ({ transportations }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [addTransportation, { error }] = useMutation(UPDATE_TRIP);

  if (!transportations.length) {
    return <h3>No Transportation Yet</h3>;
  }

  const addTransportationToTrip = async (transportationId) => {
    try {
      const { data } = await addTransportation({
        variables: { tripId: tripId, transportation: transportationId },
      });
      console.log(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {transportations.map((transportation) => (
        <div key={transportation._id} className="p-4 bg-white rounded-lg shadow-md">
          <div className="mb-3 card">
            <h4 className="text-lg font-bold">{transportation.category}</h4>
          </div>
          <div className="text-gray-500">
            <p>{transportation.address} {transportation.state}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              onClick={() => {
                addTransportationToTrip(transportation._id);
              }}
            >
              Add to Trip
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransportationByState;
