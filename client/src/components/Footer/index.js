import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="max-w-screen-md pt-5 mx-auto">
      <div className="container my-auto mb-5 text-center">
        <h4 className="text-lg text-center text-white">
          &copy; {new Date().getFullYear()} | tripr
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
