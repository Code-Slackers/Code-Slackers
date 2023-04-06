const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const transportationSchema = new Schema({
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
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  amenities: [
    {
      type: String,
    },
  ],
});

const Transportation = model("Transportation", transportationSchema);

module.exports = Transportation;
