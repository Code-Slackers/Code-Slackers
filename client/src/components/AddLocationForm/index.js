import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";

import { ADD_LOCATION } from "../../utils/mutations";

import Auth from "../../utils/auth";

const AddLocationForm = ({ profileId }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    city: "",
    state: "",
    images: [],
  });
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
      const images = document
        .getElementsByTagName("img")[0]
        .getAttribute("data-id");
      const { data } = await addLocation({
        variables: { ...formState, images: [images] },
      });
      console.log(data);
      navigate(-1);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      city: "",
      state: "",
      images: [],
    });
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="card border max-w-screen-lg  mx-auto">
          <form className="card-body p-4 sm:p-8" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-4">
              <input
                className="input input-primary"
                placeholder="Name of City"
                name="city"
                type="string"
                value={formState.city}
                onChange={handleChange}
                required
              />
              <select
                className="select select-primary"
                name="state"
                type="string"
                value={formState.state}
                onChange={handleChange}
                required
              >
                <option value="">Select A State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <button
                className="btn bg-black hover:bg-primary text-white mt-4"
                type="submit"
              >
                ADD CITY
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>Got pics of this place? Add one of 'em to plus things up.</p>
            <div className="w-10 h-10">
              <img id="image" data-id=""></img>
            </div>
            <CloudinaryUploadWidget />
          </div>
        </div>
      ) : (
        <p>
          You need to be logged in to add location. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && (
        <div className="alert alert-error mt-5 max-w-[40rem] mx-auto">
          {error?.message}
        </div>
      )}
    </div>
  );
};

export default AddLocationForm;
