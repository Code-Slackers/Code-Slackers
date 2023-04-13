import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { UPDATE_FOOD } from "../../utils/mutations";

import Auth from "../../utils/auth";

const UpdateFoodForm = () => {
  const foodId = useParams();
  const [formState, setFormState] = useState({ foodId: foodId.ID, phone: "", images: [], reviews: [], starRating: {} });
  const [updateFood, { error, data }] = useMutation(UPDATE_FOOD);

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
      console.log("imagesURL:", images);
      const starInt = parseInt(formState.starRating);
      console.log("parser", formState.starRating);
      console.log(formState, images, "starInt", starInt);
      const { data } = await updateFood({
        variables: { ...formState, starRating: starInt, images: [images] },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      foodId: foodId,
      phone: "",
      images: [],
      reviews: "",
      starRating: {},
    });
  };

  return (
    <div>
     <h2 className="mb-5 text-center text-primary">Update Food</h2>

      {Auth.loggedIn() ? (
        <div className="card border max-w-[40rem] mx-auto">
        <form className="flex flex-col min-w-full mb-4" data-id={formState.foodId} onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-4">
          <div className="w-10 h-10">
            <img id="image" data-id="123"></img>
          </div>
          <input className="input input-primary" placeholder="phone" name="phone" type="string" value={formState.phone} onChange={handleChange} />
          <input className="input input-primary" placeholder="reviews" name="reviews" type="string" value={formState.reviews} onChange={handleChange} />
          <select className="select select-primary" name="starRating" type="number" value={formState.starRating} onChange={handleChange}>
            <option>How would you Rate</option>

            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button className="mt-4 text-white btn btn-primary" type="submit">
            Submit
          </button>
          </div>

        </form>
        </div>

      ) : (
        <p>
          You need to be logged in to Update food. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && <div className="alert alert-error mt-5 max-w-[40rem] mx-auto">{error.message}</div>}
    </div>
  );
};

export default UpdateFoodForm;
