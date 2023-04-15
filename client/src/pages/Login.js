import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      navigate("/home");
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="grid items-center h-full gap-6 pt-10 xl:grid-cols-2">
      <div className="border shadow rounded-3xl">
        <div className="card-body">
          <h1 className="mb-10 text-neutral">Welcome back, tripr.</h1>
          {data ? (
            <p className="text-center">
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <>
              <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
                <input
                  className="input input-primary"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="input input-primary"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="relative text-white btn btn-primary"
                  type="submit"
                >
                  <ArrowRightOnRectangleIcon className="w-7 h-7 opacity-60 absolute top-[50%] translate-y-[-50%] left-4" />
                  Log In
                </button>
              </form>
              {error && (
                <div className="text-white alert alert-error">
                  {error?.message}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="hidden xl:block">
        <img src="/adventure_map.svg" className="max-w-[100%]" />
      </div>
    </div>
  );
};

export default Login;
