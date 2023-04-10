import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-full text-black px-3 py-5">
      <div className="flex items-center justify-center flex-col gap-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-secondary btn-sm gap-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLongLeftIcon className='w-5 h-5' />
            Go Back
          </button>
        )}
        <h4 className='text-sm'>&copy; {new Date().getFullYear()} - tripr</h4>
      </div>
    </footer>
  );
};

export default Footer;
