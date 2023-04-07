import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-full text-black">
      <div className="mx-auto text-center mb-5 pt-6">
        {location.pathname !== '/' && (
          <button
            className="px-4 py-1 text-lg bg-secondary rounded-md m-2"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className='text-sm'>&copy; {new Date().getFullYear()} - tripr</h4>
      </div>
    </footer>
  );
};

export default Footer;
