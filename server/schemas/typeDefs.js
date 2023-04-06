const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    trips: [String]!
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

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    food: [Food]
    transportation: [Transportation]
    lodging: [Lodging]
    thingsToDo: [ThingsToDo]
    trips: [Trip]!
    trip(tripId: ID!): Trip
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(profileId: ID!, dateOfTrip: String!): Trip
    updateTrip(tripId: ID!, location: [ID], lodging: [ID], food: [ID], thingsToDo: [ID], transportation: [ID]): Trip
    addFood(profileId: ID!, city: String!, state: String!, address: String!, phone: String, category: String!, cost: Int!, images: [String], reviews: [String], starRating: Int): Food
    addLodging(profileId: ID!, city: String!, state: String!, address: String!, phone: String, category: String!, cost: Int!, amenities: [String], images: [String], reviews: [String], starRating: Int): Lodging
    addTransportation(profileId: ID!, city: String!, state: String!, address: String, phone: String, category: String!, amenities: [String]): Transportation
    addThingsToDo(profileId: ID!, city: String!, state: String!, address: String!, phone: String, category: String!, cost: Int!, images: [String], reviews: [String], starRating: Int): ThingsToDo
    removeProfile: Profile
  }
`;

module.exports = typeDefs;
