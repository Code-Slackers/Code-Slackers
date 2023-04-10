import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THINGS_TO_DO } from "../../utils/mutations";

import Auth from "../../utils/auth";

const AddThingsToDoForm = ({ locations }) => {
  const [formState, setFormState] = useState({ locationId: "", city: "", state: "", address: "", phone: "", category: "", cost: {} });
  const [addThingsToDo, { error, data }] = useMutation(ADD_THINGS_TO_DO);

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
      const costInt = parseInt(formState.cost);
      const { data } = await addThingsToDo({
        variables: { ...formState, cost: costInt },
      });
      console.log(data);
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
      cost: {},
    });
  };

  return (
    <div>
      <h4>Add your NEW Things To Do.</h4>

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
          <input className="w-full mb-2 p-2" placeholder="address" name="address" type="string" value={formState.address} onChange={handleChange} />
          <input className="w-full mb-2 p-2" placeholder="City" name="city" type="string" value={formState.city} onChange={handleChange} />
          <select className="w-full mb-2 p-2" name="state" type="string" value={formState.state} onChange={handleChange}>
            <option value="">Select a State</option>
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
          <input className="w-full mb-2 p-2" placeholder="phone" name="phone" type="string" value={formState.phone} onChange={handleChange} />
          <select className="w-full mb-2 p-2" name="category" type="string" value={formState.category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="Museum">Museum</option>
            <option value="Park">Park</option>
            <option value="Shopping">Shopping</option>
            <option value="Theater">Theater</option>
            <option value="Zoo">Zoo</option>
            <option value="Amusement Park">Amusement Park</option>
            <option value="Aquarium">Aquarium</option>
            <option value="Beach">Beach</option>
            <option value="Casino">Casino</option>
            <option value="Church">Church</option>
            <option value="Cinema">Cinema</option>
            <option value="Cultural Center">Cultural Center</option>
            <option value="Garden">Garden</option>
            <option value="Historical Site">Historical Site</option>
            <option value="Library">Library</option>
            <option value="Monument">Monument</option>
            <option value="Other">Other</option>
          </select>
          <select className="w-full mb-2 p-2" name="cost" type="number" value={formState.cost} onChange={handleChange}>
            <option>How would you Rate Cost</option>

            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button className="px-4 py-1 text-lg bg-primary rounded-md mt-4 text-white hover:bg-white hover:text-primary" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <p>
          You need to be logged in to add Things to Do. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && <div className="col-12 my-3 bg-danger text-white p-3">{error.message}</div>}
    </div>
  );
};

export default AddThingsToDoForm;
