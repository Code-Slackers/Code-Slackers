import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ADD_TRANSPORTATION } from "../../utils/mutations";

import Auth from "../../utils/auth";

const AddTransportationForm = ({ locations }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    locationId: "",
    city: "",
    state: "",
    address: "",
    phone: "",
    category: "",
  });
  const [addTransportation, { error, data }] = useMutation(ADD_TRANSPORTATION);

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
      const { data } = await addTransportation({
        variables: { ...formState },
      });
      console.log(data);
      navigate(-1);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      locationId: "",
      city: "",
      state: "",
      address: "",
      phone: "",
      category: "",
    });
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="card max-w-screen-md mx-auto">
          <form
            className="flex flex-col min-w-full mb-4"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col gap-4">
              <select
                className="select select-primary"
                name="locationId"
                type="string"
                value={formState.locationId}
                onChange={handleChange}
              >
                <option value="">Select A Location</option>
                {locations &&
                  locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.city}, {location.state}
                    </option>
                  ))}
              </select>
              <input
                className="input input-primary"
                placeholder="Address"
                name="address"
                type="string"
                value={formState.address}
                onChange={handleChange}
              />
              <input
                className="input input-primary"
                placeholder="City"
                name="city"
                type="string"
                value={formState.city}
                onChange={handleChange}
              />
              <select
                className="select select-primary"
                name="state"
                type="string"
                value={formState.state}
                onChange={handleChange}
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
              <input
                className="input input-primary"
                placeholder="Phone"
                name="phone"
                type="string"
                value={formState.phone}
                onChange={handleChange}
              />
              <select
                className="select select-primary"
                name="category"
                type="string"
                value={formState.category}
                onChange={handleChange}
              >
                <option value="">What kind of transportation is this?</option>
                <option value="Airline">Airline</option>
                <option value="Bus">Bus</option>
                <option value="Car Rental">Car Rental</option>
                <option value="Cruise">Cruise</option>
                <option value="Rail">Rail</option>
                <option value="Taxi">Taxi</option>
                <option value="Train">Train</option>
                <option value="Uber">Uber</option>
                <option value="Lyft">Lyft</option>
                <option value="Ride Share">Ride Share</option>
                <option value="Other">Other</option>
              </select>
              <button
                className="px-4 py-2 mt-4 text-lg text-white rounded-md bg-black hover:bg-primary"
                type="submit"
              >
                SHARE WITH US
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>
          You need to be logged in to add Transportation. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && (
        <div className="alert alert-error mt-5 max-w-[40rem] mx-auto">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default AddTransportationForm;
