const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    trips: [Trip]!
  }

  type Food {
    _id: ID
    profileId: String!
    city: String!
    state: String!
    address: String!
    phone: String
    category: String!
    cost: Int!
    images: [String]
    reviews: [String]
    starRating: Int
  }

  type Transportation {
    _id: ID
    profileId: String!
    city: String!
    state: String!
    address: String
    phone: String
    category: String!
    amenities: [String]
  }

  type Lodging {
    _id: ID
    profileId: String!
    city: String!
    state: String!
    address: String!
    phone: String
    category: String!
    cost: Int!
    amenities: [String]
    images: [String]
    reviews: [String]
    starRating: Int
  }

  type ThingsToDo {
    _id: ID
    profileId: String!
    city: String!
    state: String!
    address: String!
    phone: String
    category: String!
    cost: Int!
    images: [String]
    reviews: [String]
    starRating: Int
  }

  type Trip {
    _id: ID
    profileId: String!
    dateOfTrip: String!
    food: [Food]
    transportation: [Transportation]
    lodging: [Lodging]
    thingsToDo: [ThingsToDo]
  }

  type Location {
    _id: ID
    profileId: String!
    city: String!
    state: String!
    lodging: [Lodging]
    food: [Food]
    thingsToDo: [ThingsToDo]
    transportation: [Transportation]
    visitors: [Profile]
    trips: [Trip]
    images: [String]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    food: [Food]
    oneFood(foodId: ID!): Food
    transportation: [Transportation]
    oneTransportation(transportationId: ID!): Transportation
    lodging: [Lodging]
    oneLodging(lodgingId: ID!): Lodging
    thingsToDo: [ThingsToDo]
    oneThingsToDo(thingsToDoId: ID!): ThingsToDo
    locations: [Location]
    location(locationId: ID!): Location
    trips: [Trip]!
    trip(tripId: ID!): Trip
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(locationId: ID!, dateOfTrip: String!): Trip
    addLocation(city: String!, state: String!): Location
    updateLocation(locationId: ID!, visitors: [ID], images: [String]): Location
    updateTrip(tripId: ID!, lodging: [ID], food: [ID], thingsToDo: [ID], transportation: [ID]): Trip
    addFood(locationId: ID!, city: String!, state: String!, address: String!, phone: String, category: String!, cost: Int!, images: [String], reviews: [String], starRating: Int): Food
    updateFood(foodId: ID!, phone: String, images: [String], reviews: [String], starRating: Int): Food
    addLodging(locationId: ID!, city: String!, state: String!, address: String!, phone: String, category: String!, cost: Int!, amenities: [String], images: [String], reviews: [String], starRating: Int): Lodging
    updateLodging(lodgingId: ID!, phone: String, amenities: [String], images: [String], reviews: [String], starRating: Int): Lodging
    addTransportation(locationId: ID!, city: String!, state: String!, address: String, phone: String, category: String!, amenities: [String]): Transportation
    updateTransportation(transportationId: ID!, address: String, phone: String, amenities: [String]): Transportation
    addThingsToDo(locationId: ID!, city: String!, state: String!, address: String!, phone: String, category: String!, cost: Int!, images: [String], reviews: [String], starRating: Int): ThingsToDo
    updateThingsToDo(thingsToDoId: ID!, phone: String, images: [String], reviews: [String], starRating: Int): ThingsToDo
    removeProfile: Profile
  }
`;

module.exports = typeDefs;
