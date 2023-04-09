import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_TRIP } from "../../utils/mutations";

import Auth from "../../utils/auth";

const AddTripForm = ({ locations }) => {
  const [formState, setFormState] = useState({ locationId: "", dateOfTrip: "" });
  const [addTrip, { error, data }] = useMutation(ADD_TRIP);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addTrip({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      locationId: "",
      dateOfTrip: "",
    });
  };

  if (!locations.length) {
    return <h3>No Locations Yet</h3>;
  }

  return (
    <div>
      <h4>Start Your Trip.</h4>

      {Auth.loggedIn() ? (
        <form className="flex flex-col mb-4 min-w-full" onSubmit={handleFormSubmit}>
          <select className="w-full mb-2 p-2" name="locationId" type="string" value={formState.locationId} onChange={handleChange}>
            <option value="">Select a Location</option>
            {locations &&
              locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.city}, {location.state}
                </option>
              ))}
          </select>
          <input className="w-full mb-2 p-2" placeholder="Date of Trip" name="dateOfTrip" type="date" value={formState.dateOfTrip} onChange={handleChange} />
          <button className="px-4 py-1 text-lg bg-primary rounded-md mt-4 text-white hover:bg-white hover:text-primary" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <p>
          You need to be logged in to add a trip. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && <div className="col-12 my-3 bg-danger text-white p-3">{error.message}</div>}
    </div>
  );
};

export default AddTripForm;
