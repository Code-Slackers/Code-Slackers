import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import { UPDATE_TRIP } from "../../utils/mutations";

const FoodByState = ({ foods }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [addFood, { error }] = useMutation(UPDATE_TRIP);

  if (!foods.length) {
    return <h3>No Foods Yet</h3>;
  }

  const addFoodToTrip = async (foodId) => {
    console.log(tripId);
    try {
      const { data } = await addFood({
        variables: { tripId: tripId, food: foodId },
      });
      console.log(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ">
      {foods.map((food) => (
        <div key={food._id} className="p-4 border rounded-lg shadow-md sm:p-6">
          <div className="mb-3 card">
            <h4 className="text-lg font-medium">{food.category}</h4>
          </div>
          <div className="text-gray-600">
            <p>
              {food.address}, {food.state}
            </p>
            <p>{food.cost} </p>
            <p className="text-3xl text-brand-yellow">{food.starRating}</p>
          </div>
          {!food.images[0] ? null : (
            <div className="mt-3">
              <img
                src={`https://res.cloudinary.com/drlulo3bd/image/upload/v1681491065/${food.images[0]}`}
                alt="food"
                className="object-cover w-full h-40 rounded-lg"
              />
            </div>
          )}
          <button
            className="inline-flex items-center justify-center w-full px-4 py-2 mt-3 text-base text-white bg-black border border-transparent rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              addFoodToTrip(food._id);
            }}
          >
            ADD TO TRIP
          </button>
        </div>
      ))}
    </div>
  );
};

export default FoodByState;
