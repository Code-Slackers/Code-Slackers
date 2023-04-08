import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_LOCATION } from "../../utils/mutations";

import Auth from "../../utils/auth";

const AddLocationForm = ({ profileId }) => {
  const [formState, setFormState] = useState({ city: "", state: "" });
  const [addLocation, { error, data }] = useMutation(ADD_LOCATION);

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
      const { data } = await addLocation({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      city: "",
      state: "",
    });
  };

  return (
    <div>
      <h4>Add your NEW location.</h4>

      {Auth.loggedIn() ? (
        <form className="flex flex-col mb-4 min-w-full" onSubmit={handleFormSubmit}>
          <input className="w-full mb-2 p-2" placeholder="City to add" name="city" type="string" value={formState.city} onChange={handleChange} />
          <input className="w-full mb-2 p-2" placeholder="State to add" name="state" type="string" value={formState.state} onChange={handleChange} />
          <button className="px-4 py-1 text-lg bg-primary rounded-md mt-4 text-white hover:bg-white hover:text-primary" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <p>
          You need to be logged in to add location. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && <div className="col-12 my-3 bg-danger text-white p-3">{error.message}</div>}
    </div>
  );
};

export default AddLocationForm;
