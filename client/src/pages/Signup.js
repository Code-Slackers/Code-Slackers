import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
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
    <div className='h-full grid xl:grid-cols-2 items-center gap-6 pt-10'>
      <div className='shadow border rounded-3xl'>
        <div className='card-body'>
          <h1 className='text-neutral mb-10'>Signup</h1>
          {data ? (
            <p className='text-center'>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <>
              <form className='flex flex-col gap-3' onSubmit={handleFormSubmit} >
                <input
                  className="input input-primary input-lg"
                  placeholder="Your username"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
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
                  className="btn btn-primary input-lg text-white"
                  style={{ cursor: 'pointer' }}
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
        <img src='/trip_re.svg' className='max-w-[100%]' />
      </div>
    </div>
  );
};

export default Signup;
