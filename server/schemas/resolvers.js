const { AuthenticationError } = require("apollo-server-express");
const { Profile, Food, Trips, ThingsToDo, Lodging, Transportation, Location } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.loggedIn) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    food: async () => {
      return Food.find();
    },
    oneFood: async (parent, { foodId }) => {
      return Food.findOne({ _id: foodId });
    },
    transportation: async () => {
      return Transportation.find();
    },
    oneTransportation: async (parent, { transportationId }) => {
      return Transportation.findOne({ _id: transportationId });
    },
    lodging: async () => {
      return Lodging.find();
    },
    oneLodging: async (parent, { lodgingId }) => {
      return Lodging.findOne({ _id: lodgingId });
    },
    thingsToDo: async () => {
      return ThingsToDo.find();
    },
    oneThingsToDo: async (parent, { thingsToDoId }) => {
      return ThingsToDo.findOne({ _id: thingsToDoId });
    },
    trips: async () => {
      return Trips.find().populate(["food", "thingsToDo", "lodging", "transportation"]);
    },
    trip: async (parent, { tripId }) => {
      return Trips.findOne({ _id: tripId }).populate(["food", "thingsToDo", "lodging", "transportation"]);
    },
    locations: async () => {
      return Location.find().populate(["food", "thingsToDo", "lodging", "transportation", "visitors", "trips"]);
    },
    location: async (parent, { locationId }) => {
      return Location.findOne({ _id: locationId }).populate(["food", "thingsToDo", "lodging", "transportation", "visitors", "trips"]);
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addTrip: async (parent, { locationId, profileId, dateOfTrip }, context) => {
      if (context.loggedIn) {
        const createTrip = await Trips.create({ profileId, dateOfTrip });
        await Profile.findOneAndUpdate(profileId, { $push: { trips: createTrip._id } }, { new: true });
        await Location.findOneAndUpdate(locationId, { $push: { trips: createTrip._id } }, { new: true });
        return createTrip;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addLocation: async (parent, { profileId, city, state }, context) => {
      if (context.loggedIn) {
        const createLocation = await Location.create({ profileId, city, state });
        return createLocation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateTrip: async (parent, args, context) => {
      if (context.loggedIn) {
        const updatedTrip = await Trips.findOneAndUpdate({ _id: args.tripId }, args, { new: true });
        return await updatedTrip.populate(["food", "lodging", "thingsToDo", "transportation"]);
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateLocation: async (parent, args, context) => {
      if (context.loggedIn) {
        const updatedLocation = await Location.findOneAndUpdate({ _id: args.locationId }, args, { new: true });
        return await updatedLocation.populate(["food", "lodging", "thingsToDo", "transportation", "visitors"]);
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addFood: async (parent, { locationId, profileId, city, state, address, phone, category, cost, images, reviews, starRating }, context) => {
      if (context.loggedIn) {
        const addFood = await Food.create({ profileId, city, state, address, phone, category, cost, images, reviews, starRating });
        const updateLocation = await Location.findOneAndUpdate(locationId, { $push: { food: addFood._id } }, { new: true });
        return addFood;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateFood: async (parent, args, context) => {
      if (context.loggedIn) {
        const updatedFood = await Food.findOneAndUpdate({ _id: args.foodId }, args, { new: true });
        return updatedFood;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addLodging: async (parent, { locationId, profileId, city, state, address, phone, category, cost, amenities, images, reviews, starRating }, context) => {
      if (context.loggedIn) {
        const addLodging = await Lodging.create({ profileId, city, state, address, phone, category, cost, amenities, images, reviews, starRating });
        await Location.findOneAndUpdate(locationId, { $push: { lodging: addLodging._id } }, { new: true });
        return addLodging;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateLodging: async (parent, args, context) => {
      if (context.loggedIn) {
        const updatedLodging = await Lodging.findOneAndUpdate({ _id: args.lodgingId }, args, { new: true });
        return updatedLodging;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addTransportation: async (parent, { locationId, profileId, city, state, address, phone, category, amenities }, context) => {
      if (context.loggedIn) {
        const addTransportation = await Transportation.create({ profileId, city, state, address, phone, category, amenities });
        await Location.findOneAndUpdate(locationId, { $push: { transportation: addTransportation._id } }, { new: true });
        return addTransportation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateTransportation: async (parent, args, context) => {
      if (context.loggedIn) {
        const updatedTransportation = await Transportation.findOneAndUpdate({ _id: args.transportationId }, args, { new: true });
        return updatedTransportation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addThingsToDo: async (parent, { locationId, profileId, city, state, address, phone, category, cost, images, reviews, starRating }, context) => {
      if (context.loggedIn) {
        const addThingsToDo = await ThingsToDo.create({ profileId, city, state, address, phone, category, cost, images, reviews, starRating });
        await Location.findOneAndUpdate(locationId, { $push: { thingsToDo: addThingsToDo._id } }, { new: true });
        return addThingsToDo;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateThingsToDo: async (parent, args, context) => {
      if (context.loggedIn) {
        const updatedThingsToDo = await ThingsToDo.findOneAndUpdate({ _id: args.thingsToDoId }, args, { new: true });
        return updatedThingsToDo;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.loggedIn) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Make it so a logged in user can only remove a skill from their own profile
  },
};

module.exports = resolvers;
