const { Schema, model } = require("mongoose");

const Location = require("./Location");
const Lodging = require("./Lodging");
const Food = require("./Food");
const ThingsToDo = require("./ThingsToDo");
const Transportation = require("./Transportation");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const tripsSchema = new Schema({
  profileId: {
    type: String,
    required: true,
  },
  dateOfTrip: {
    type: String,
    required: true,
  },

  lodging: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lodging",
    },
  ],
  food: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  thingsToDo: [
    {
      type: Schema.Types.ObjectId,
      ref: "ThingsToDo",
    },
  ],
  transportation: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transportation",
    },
  ],
});

const Trips = model("Trips", tripsSchema);

module.exports = Trips;
