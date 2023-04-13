import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { ADD_TRIP } from "../../utils/mutations";

import Auth from "../../utils/auth";

const AddTripForm = ({ locations }) => {
  const params = useParams();
  const [formState, setFormState] = useState({ locationId: params.locationId, dateOfTrip: "" });
  const [addTrip, { error }] = useMutation(ADD_TRIP);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit trip form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTrip({
        variables: { ...formState },
      });
      const tripId = "6432177304ec3a23c9c98630";
      window.location.assign(`/selectedlocation/${params.locationId}/${tripId}`);
      // clear form values
      setFormState({
        locationId: params.locationId,
        dateOfTrip: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (!locations.length) {
    return <h3>No Locations Yet</h3>;
  }

  return (
    <div>
      <h2 className="mb-5 text-center text-primary">Start Your Trip.</h2>

      {Auth.loggedIn() ? (
        <div className="card border max-w-[40rem] mx-auto">
          <form className="card-body" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-4">
              <select className="select select-primary" name="locationId" type="string" value={formState.locationId} onChange={handleChange} required>
                <option value="">Select a Location</option>
                {locations &&
                  locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.city}, {location.state}
                    </option>
                  ))}
              </select>
              <input className="input input-primary" placeholder="Date of Trip" name="dateOfTrip" type="date" value={formState.dateOfTrip} onChange={handleChange} required />
              <button className="mt-4 text-white btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>
          You need to be logged in to add a trip. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && <div className="alert alert-error mt-5 max-w-[40rem] mx-auto">{error.message}</div>}
    </div>
  );
};

export default AddTripForm;
