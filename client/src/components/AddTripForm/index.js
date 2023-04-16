import { useMutation } from "@apollo/client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ADD_TRIP } from "../../utils/mutations";

import Auth from "../../utils/auth";

const AddTripForm = ({ locations }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [formState, setFormState] = useState({
    locationId: params.locationId,
    dateOfTrip: "",
  });
  const [addTrip, { error, data, loading }] = useMutation(ADD_TRIP);
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
      const mutationResult = await addTrip({
        variables: { ...formState },
      });
      const tripId = mutationResult.data.addTrip._id;
      window.location.assign(
        `/selectedlocation/${params.locationId}/${tripId}`
      );
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
    <div className="max-w-screen-md mx-auto space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className=" text-center text-primary">Build Your Own Trip</h2>
        {location.pathname !== "/" && (
          <button
            className="px-4 py-2 text-white bg-black rounded-lg hover:bg-primary transition-all hover:text-white flex items-center gap-2 "
            onClick={() => navigate(-1)}
          >
            <ArrowLongLeftIcon className="w-5 h-5" />
            Back
          </button>
        )}
      </div>
      {Auth.loggedIn() ? (
        <div className="card border  ">
          <form className="card-body" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-4">
              <select
                className="select select-primary"
                name="locationId"
                type="string"
                value={formState.locationId}
                onChange={handleChange}
                required
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
                placeholder="Date of Trip"
                name="dateOfTrip"
                type="date"
                value={formState.dateOfTrip}
                onChange={handleChange}
                required
              />
              <button
                className="mt-4 text-white btn bg-black hover:bg-primary"
                type="submit"
              >
                GET STARTED
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>
          You need to be logged in to add a trip. Please{" "}
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

export default AddTripForm;
