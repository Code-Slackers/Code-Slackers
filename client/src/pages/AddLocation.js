import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddLocationForm from "../components/AddLocationForm";
const AddLocation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <main>
      <div className="max-w-screen-md  mx-auto">
        <div className="my-3 col-12 col-md-10">
          <div className="p-3 card space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-2xl ">New City. New Adventure.</h2>
            {location.pathname !== "/" && (
                  <button
                    className="px-4 py-2 text-black bg-secondary rounded-lg hover:bg-brand-yellow transition-all hover:text-white flex items-center gap-2 "
                    onClick={() => navigate(-1)}
                  >
                    <ArrowLongLeftIcon className="w-5 h-5" />
                    Go Back
                  </button>
              )
              }
           </div>
            <AddLocationForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddLocation;
