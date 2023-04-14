import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";

import { ADD_LODGING } from "../../utils/mutations";

import Auth from "../../utils/auth";

const AddLodgingForm = ({ locations }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ locationId: "", city: "", state: "", address: "", phone: "", category: "", cost: {}, amenities: [], images: [], reviews: [], starRating: {} });
  const [addLodging, { error, data }] = useMutation(ADD_LODGING);

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
      const images = document.getElementsByTagName("img")[0].getAttribute("data-id");

      const { data } = await addLodging({
        variables: { ...formState, images: [images] },
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
      cost: {},
      amenities: [],
      images: [],
      reviews: [],
      starRating: {},
    });
  };

  return (
    <div>
      <h2 className="mb-5 text-center text-primary">Add Your NEW Lodging</h2>

      {Auth.loggedIn() ? (
        <div className="card border max-w-[40rem] mx-auto">
          <form className="flex flex-col min-w-full mb-4" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-4">
              <select className="select select-primary" name="locationId" type="string" value={formState.locationId} onChange={handleChange}>
                <option value="">Select a Location</option>
                {locations &&
                  locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.city}, {location.state}
                    </option>
                  ))}
              </select>
              <input className="input input-primary" placeholder="address" name="address" type="string" value={formState.address} onChange={handleChange} />
              <input className="input input-primary" placeholder="City" name="city" type="string" value={formState.city} onChange={handleChange} />
              <select className="select select-primary" name="state" type="string" value={formState.state} onChange={handleChange}>
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
              <input className="input input-primary" placeholder="phone" name="phone" type="string" value={formState.phone} onChange={handleChange} />
              <select className="select select-primary" name="category" type="string" value={formState.category} onChange={handleChange}>
                <option value="">Select a category</option>
                <option value="Hotel">Hotel</option>
                <option value="Motel">Motel</option>
                <option value="Bed and Breakfast">Bed and Breakfast</option>
                <option value="Cabin">Cabin</option>
                <option value="Campground">Campground</option>
                <option value="RV Park">RV Park</option>
                <option value="Hostel">Hostel</option>
                <option value="Resort">Resort</option>
                <option value="Vacation Rental">Vacation Rental</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Dorm">Dorm</option>
                <option value="Other">Other</option>
              </select>
              <select className="select select-primary" name="cost" type="number" value={formState.cost} onChange={handleChange}>
                <option>How would you Rate Cost</option>

                <option value="$">1</option>
                <option value="$$">2</option>
                <option value="$$$">3</option>
                <option value="$$$$">4</option>
                <option value="$$$$$">5</option>
              </select>
              <select className="select select-primary" name="starRating" type="number" value={formState.starRating} onChange={handleChange}>
                <option>Star Rating</option>
                <option value="*">1</option>
                <option value="**">2</option>
                <option value="***">3</option>
                <option value="****">4</option>
                <option value="*****">5</option>
              </select>
              <button className="px-4 py-1 mt-4 text-lg text-white rounded-md bg-primary hover:bg-white hover:text-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
          <div>
            <div className="w-10 h-10">
              <img id="image" data-id=""></img>
            </div>
            <CloudinaryUploadWidget />
          </div>
        </div>
      ) : (
        <p>
          You need to be logged in to add Lodging. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && <div className="alert alert-error mt-5 max-w-[40rem] mx-auto">{error.message}</div>}
    </div>
  );
};

export default AddLodgingForm;
