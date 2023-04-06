const { AuthenticationError } = require("apollo-server-express");
const { Profile, Food, Trips, ThingsToDo, Lodging, Transportation } = require("../models");
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
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    food: async () => {
      return Food.find();
    },
    transportation: async () => {
      return Transportation.find();
    },
    lodging: async () => {
      return Lodging.find();
    },
    thingsToDo: async () => {
      return ThingsToDo.find();
    },
    trips: async () => {
      return Trips.find().populate(["food", "thingsToDo", "lodging", "transportation"]);
    },
    trip: async (parent, { tripId }) => {
      return Trips.findOne({ _id: tripId }).populate(["food", "thingsToDo", "lodging", "transportation"]);
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

    addTrip: async (parent, { profileId, dateOfTrip }, context) => {
      // if (context.user) {
      const createTrip = await Trips.create({ profileId, dateOfTrip });
      await Profile.findOneAndUpdate(profileId, { $push: { trips: createTrip._id } }, { new: true });
      return createTrip;
    },
    // throw new AuthenticationError("You need to be logged in!");
    // },

    updateTrip: async (parent, args, context) => {
      // if (context.user) {
      const updatedTrip = await Trips.findOneAndUpdate({ _id: args.tripId }, args, { new: true });
      return await updatedTrip.populate(["food", "lodging", "thingsToDo", "transportation"]);
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    addFood: async (parent, { profileId, city, state, address, phone, category, cost, images, reviews, starRating }, context) => {
      // if (context.user) {
      const addFood = await Food.create({ profileId, city, state, address, phone, category, cost, images, reviews, starRating });
      return addFood;
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    addLodging: async (parent, { profileId, city, state, address, phone, category, cost, amenities, images, reviews, starRating }, context) => {
      // if (context.user) {
      const addLodging = await Lodging.create({ profileId, city, state, address, phone, category, cost, amenities, images, reviews, starRating });
      return addLodging;
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    addTransportation: async (parent, { profileId, city, state, address, phone, category, amenities }, context) => {
      // if (context.user) {
      const addTransportation = await Transportation.create({ profileId, city, state, address, phone, category, amenities });
      return addTransportation;
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    addThingsToDo: async (parent, { profileId, city, state, address, phone, category, cost, images, reviews, starRating }, context) => {
      // if (context.user) {
      const addThingsToDo = await ThingsToDo.create({ profileId, city, state, address, phone, category, cost, images, reviews, starRating });
      return addThingsToDo;
      // }
      // throw new AuthenticationError("You need to be logged in!");
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
