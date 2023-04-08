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

    <div className='h-full grid xl:grid-cols-2 items-center gap-6 pt-10'>
      <div className='shadow border rounded-3xl'>
        <div className='card-body'>
          <h1 className='text-neutral mb-10'>Login</h1>
          {data ? (
            <p className='text-center'>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <>
              <form className='flex flex-col gap-3' onSubmit={handleFormSubmit}>
                <input
                  className="input input-primary input-lg"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="input input-primary input-lg"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-primary text-white input-lg"
                  type="submit"
                >
                  Submit
                </button>
              </form>
              {(error) && (
                <div className="alert alert-error text-white">
                  {error?.message}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className='hidden xl:block'>
        <img src='/adventure_map.svg' className='max-w-[100%]' />
      </div>
    </div>
  );
};

export default Login;
