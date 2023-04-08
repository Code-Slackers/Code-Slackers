import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-full text-black px-3 py-6">
      <div className="flex items-center justify-center flex-col gap-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-secondary"
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
