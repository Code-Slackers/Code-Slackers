const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const thingsToDoSchema = new Schema({
  profileId: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: String,
    },
  ],
  starRating: {
    type: Number,
  },
});

const ThingsToDo = model("ThingsToDo", thingsToDoSchema);

module.exports = ThingsToDo;
