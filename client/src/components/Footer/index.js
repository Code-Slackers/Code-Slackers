import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="p-4 mt-auto w-100 text-dark">
      <div className="container mb-5 text-center my-auto">
        {location.pathname !== "/" && (
          <button
            className="px-4 py-2 text-black bg-secondary rounded-lg hover:bg-primary hover:text-white flex align-center m-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLongLeftIcon className="w-5 h-5" />
            Go Back
          </button>
        )}
        <h4 className="text-sm">&copy; {new Date().getFullYear()} - tripr</h4>
      </div>
    </footer>
  );
};

export default Footer;
