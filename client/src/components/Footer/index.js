import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="p-4 mt-auto w-100 text-dark">
      <div className="container mb-5 text-center">
        {location.pathname !== '/' && (
          <button
            className="mb-3 btn btn-dark"
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
