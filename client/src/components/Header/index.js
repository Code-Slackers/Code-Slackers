import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const [open, setOpen] = useState(false)
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <header className="relative px-2 py-2 mb-4 bg-primary text-dark lg:px-3 lg:py-5">
      <div className="flex justify-between w-full lg:flex-col lg:justify-center lg:items-center">
        <div className='z-10 flex flex-col lg:justify-center lg:items-center'>
          <Link className="text-dark" to="/">
            <h1 className="pb-2 text-2xl font-bold text-secondary md:text-4xl lg:text-5xl">
              tripr
            </h1>
          </Link>
          <p className="mb-2 font-bold text-gray-300 md:text-lg lg:text-xl">
            Find Your Next Adventure
          </p>
        </div>

        <div className='z-10 flex items-center lg:hidden'>
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
              {/* <Link className="px-4 py-2 m-2 text-lg text-white rounded-md bg-secondary" to="/me">
                View My Profile
              </Link> */}
              <button className="h-10 gap-1 btn btn-secondary btn-sm" onClick={logout}>
                <ArrowLeftOnRectangleIcon className='w-6 h-6' />
                Logout
              </button>
              <Link to={'/'} className="flex items-center justify-center w-10 h-10 bg-white rounded-md hover:bg-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </Link>
            </div>
          ) : (
            <div className='flex items-center justify-center gap-3 mt-3'>
              <Link className="px-4 btn btn-secondary btn-sm" to="/login">
                Login
              </Link>
              <Link className="px-4 btn btn-secondary btn-sm" to="/signup">
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
