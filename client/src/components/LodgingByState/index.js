import React from "react";

const LodgingByState = ({ lodgings }) => {
  if (!lodgings.length) {
    return (
      <div className="mt-5 text-center">
        <h3>No Lodging Yet</h3>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {lodgings &&
        lodgings.map((lodging) => (
          <div key={lodging._id} id={lodging._id} className="col">
            <div className="card h-100">
              <img src={lodging.images[0]} className="card-img-top" alt="lodging" />
              <div className="card-body">
                <h5 className="card-title">{lodging.category}</h5>
                <p className="card-text">
                  {lodging.address} {lodging.state}
                </p>
                <p className="card-text">
                  {lodging.cost} {lodging.starRating}
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary w-100">ADD LODGING TO TRIP</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LodgingByState;
