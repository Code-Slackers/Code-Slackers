import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-dark mb-4 py-3 flex items-center">
      <div className="flex-col lg:flex-row lg:justify-between justify-center lg:items-center mx-auto text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0 text-secondary text-5xl font-bold pb-2">
            tripr
          </h1>
        </Link>
        <p className="mb-2 text-xl font-bold">
          Find Your Next Adventure
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              {/* <Link className="px-4 py-2 text-lg bg-secondary text-white rounded-md m-2" to="/me">
                View My Profile
              </Link> */}
              <button className="px-4 py-1 text-lg bg-secondary rounded-md m-2 hover:bg-white" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* <Link className="px-4 py-1 text-lg bg-secondary text-white rounded-md m-2" to="/login">
                Login
              </Link> */}
              <Link className="px-4 py-1 text-lg bg-secondary rounded-md m-2 hover:bg-white" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
