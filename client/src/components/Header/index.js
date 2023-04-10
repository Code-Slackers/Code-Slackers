import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const Header = () => {
  const [open, setOpen] = useState(false)
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <header className="bg-primary text-dark mb-4 px-2 lg:px-3 lg:py-5 py-2 relative">
      <div className="flex lg:flex-col justify-between lg:justify-center lg:items-center w-full">
        <div className='flex flex-col lg:justify-center lg:items-center z-10'>
          <Link className="text-dark" to="/">
            <h1 className="text-secondary text-2xl md:text-4xl lg:text-5xl font-bold pb-2">
              tripr
            </h1>
          </Link>
          <p className="mb-2 md:text-lg lg:text-xl font-bold text-gray-300">
            Find Your Next Adventure
          </p>
        </div>

        <div className='lg:hidden flex items-center z-10'>
          {
            open ? <button onClick={() => setOpen(false)}>
              <XMarkIcon className='w-8 h-8 text-secondary' />
            </button>
              : <button onClick={() => setOpen(true)}>
                <Bars3Icon className='w-8 h-8 text-secondary' />
              </button>
          }

        </div>

        <div className={`bg-primary pb-2 lg:pb-0 lg:static absolute left-0 w-full duration-200 lg:z-10 ${open ? 'z-0 top-[100%]' : 'z-[-10] top-[-100%]'}`}>
          {Auth.loggedIn() ? (
            <div className='flex items-center justify-center gap-3 mt-3'>
              {/* <Link className="px-4 py-2 text-lg bg-secondary text-white rounded-md m-2" to="/me">
                View My Profile
              </Link> */}
              <button className="btn btn-secondary btn-sm gap-1" onClick={logout}>
                <ArrowLeftOnRectangleIcon className='w-6 h-6' />
                Logout
              </button>
            </div>
          ) : (
            <div className='flex items-center justify-center gap-3 mt-3'>
              <Link className="btn btn-secondary btn-sm px-4" to="/login">
                Login
              </Link>
              <Link className="btn btn-secondary btn-sm px-4" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
