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
    <div>
      {transportations &&
        transportations.map((transportation) => (
          <div
            key={transportation._id}
            id={transportation._id}
            className="p-2 m-0 card-header bg-primary text-light m-2"
          >
            <div className="mb-3 card">
              <h4>{transportation.category}</h4>
            </div>
            <div>
              {transportation.address} {transportation.state}
            </div>
            <button
              onClick={() => {
                addTransportationToTrip(transportation._id);
              }}
            >
              ADD TO TRIP
            </button>
          </div>
        ))}
    </div>
  );
};

export default TransportationByState;
