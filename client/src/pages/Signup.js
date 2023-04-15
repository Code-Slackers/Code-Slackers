import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../utils/mutations";
import Auth from "../utils/auth";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

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
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid items-center h-full gap-6 pt-10 xl:grid-cols-2">
      <div className="border shadow rounded-3xl">
        <div className="card-body">
          <h1 className="mb-10 text-neutral">Welcome</h1>
          {data ? (
            <p className="text-center">
              Success! You may now head <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <>
              <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
                <input className="input input-primary" placeholder="Your username" name="name" type="text" value={formState.name} onChange={handleChange} />
                <input className="input input-primary" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
                <input className="input input-primary" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
                <button className="relative text-white btn btn-primary" style={{ cursor: "pointer" }} type="submit">
                  <ArrowRightOnRectangleIcon className="w-7 h-7 opacity-60 absolute top-[50%] translate-y-[-50%] left-4" />
                  Sign  up
                </button>
              </form>
              {error && <div className="text-white alert alert-error">{error?.message}</div>}
            </>
          )}
        </div>
      </div>
      <div className="hidden xl:block">
        <img src="/trip_re.svg" className="max-w-[100%]" />
      </div>
    </div>
  );
};

export default Signup;
