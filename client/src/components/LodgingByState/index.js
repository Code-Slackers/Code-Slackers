import React from "react";

const LodgingByState = ({ lodgings }) => {
  console.log(lodgings);
  if (!lodgings.length) {
    return <h3>No Lodging Yet</h3>;
  }

  return (
    <div>
      {lodgings &&
        lodgings.map((lodging) => (
          <div key={lodging._id} id={lodging._id} className="p-2 m-0 card-header bg-primary text-light m-2">
            <div className="mb-3 card">
              <h4>{lodging.category}</h4>
            </div>
            <div>
              {lodging.address} {lodging.state}
            </div>
            <div>
              {lodging.cost} {lodging.starRating}
            </div>
            {!lodging.images.length ? null : <img src={lodging.images[0]} alt="lodging" />}
            <button>ADD LODGING TO TRIP</button>
          </div>
        ))}
    </div>
  );
};

export default LodgingByState;
