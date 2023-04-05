const { Schema, model } = require("mongoose");

const Lodging = require("./Lodging");
const Food = require("./Food");
const ThingsToDo = require("./ThingsToDo");
const Transportation = require("./Transportation");
const Profile = require("./Profile");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const locationSchema = new Schema({
  userId: {
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
  visitors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
  images: [
    {
      type: String,
    },
  ],
});

const Location = model("Location", locationSchema);

module.exports = Location;
