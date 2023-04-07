import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
      
        <div className="bg-secondary rounded-lg border border-gray-300 shadow-lg p-4 mb-4 w-full">
          <h4 className="text-dark text-xl text-center py-2 mb-4 rounded-md font-bold">Login</h4>
          <div className="text-center">
            {data ? (
              <p className='text-center'>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
             ) : (
              <form className='flex flex-col mb-4 min-w-full' onSubmit={handleFormSubmit}>
                <input
                  className="w-full mb-2 p-2"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="w-full mb-2 p-2"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="px-4 py-1 text-lg bg-primary rounded-md mt-4 text-white hover:bg-white hover:text-primary"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )} 

            {error && (
              <div className="my-3 p-3 bg-red-500 text-white ">
                {error.message}              
              </div>
             )}
          </div>
        </div>
  );
};

export default Login;
