const { AuthenticationError } = require("apollo-server-express");
const { Profile, Food, Trips, ThingsToDo, Lodging, Transportation, Location } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().populate("trips");
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId }).populate("trips");
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
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

    addTrip: async (parent, { locationId, dateOfTrip }, context) => {
      if (context.user) {
        const createTrip = await Trips.create({ profileId: context.user._id, dateOfTrip });
        await Profile.findOneAndUpdate(context.user._id, { $push: { trips: createTrip._id } }, { new: true });
        await Location.findOneAndUpdate(locationId, { $push: { trips: createTrip._id } }, { new: true });
        return createTrip;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addLocation: async (parent, { city, state }, context) => {
      if (context.user) {
        const createLocation = await Location.create({ profileId: context.user._id, city, state });
        return createLocation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateTrip: async (parent, args, context) => {
      if (context.user) {
        const updatedTrip = await Trips.findOneAndUpdate({ _id: args.tripId }, args, { new: true });
        return await updatedTrip.populate(["food", "lodging", "thingsToDo", "transportation"]);
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateLocation: async (parent, args, context) => {
      if (context.user) {
        const updatedLocation = await Location.findOneAndUpdate({ _id: args.locationId }, args, { new: true });
        return await updatedLocation.populate(["food", "lodging", "thingsToDo", "transportation", "visitors"]);
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addFood: async (parent, { locationId, city, state, address, phone, category, cost, images, reviews, starRating }, context) => {
      if (context.user) {
        const addFood = await Food.create({ profileId: context.user._id, city, state, address, phone, category, cost, images, reviews, starRating });
        await Location.findOneAndUpdate(locationId, { $push: { food: addFood._id } }, { new: true });
        return addFood;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateFood: async (parent, args, context) => {
      if (context.user) {
        const updatedFood = await Food.findOneAndUpdate({ _id: args.foodId }, args, { new: true });
        return await updatedFood;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addLodging: async (parent, { locationId, city, state, address, phone, category, cost, amenities, images, reviews, starRating }, context) => {
      if (context.user) {
        const addLodging = await Lodging.create({ profileId: context.user._id, city, state, address, phone, category, cost, amenities, images, reviews, starRating });
        await Location.findOneAndUpdate(locationId, { $push: { lodging: addLodging._id } }, { new: true });
        return addLodging;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateLodging: async (parent, args, context) => {
      if (context.user) {
        const updatedLodging = await Lodging.findOneAndUpdate({ _id: args.lodgingId }, args, { new: true });
        return await updatedLodging;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addTransportation: async (parent, { locationId, city, state, address, phone, category, amenities }, context) => {
      if (context.user) {
        const addTransportation = await Transportation.create({ profileId: context.user._id, city, state, address, phone, category, amenities });
        await Location.findOneAndUpdate(locationId, { $push: { transportation: addTransportation._id } }, { new: true });
        return addTransportation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateTransportation: async (parent, args, context) => {
      if (context.user) {
        const updatedTransportation = await Transportation.findOneAndUpdate({ _id: args.transportationId }, args, { new: true });
        return await updatedTransportation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addThingsToDo: async (parent, { locationId, city, state, address, phone, category, cost, images, reviews, starRating }, context) => {
      if (context.user) {
        const addThingsToDo = await ThingsToDo.create({ profileId: context.user._id, city, state, address, phone, category, cost, images, reviews, starRating });
        await Location.findOneAndUpdate(locationId, { $push: { thingsToDo: addThingsToDo._id } }, { new: true });
        return addThingsToDo;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateThingsToDo: async (parent, args, context) => {
      if (context.user) {
        const updatedThingsToDo = await ThingsToDo.findOneAndUpdate({ _id: args.thingsToDoId }, args, { new: true });
        return await updatedThingsToDo;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Make it so a logged in user can only remove a skill from their own profile
  },
};

module.exports = resolvers;
