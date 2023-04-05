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

  type Trip {
    _id: ID
    userId: String!
    dateOfTrip: String!
    food: [Food]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    food: [Food]
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addTrip(profileId: ID!, dateOfTrip: String!, food: [ID]): Profile
    # , location: [ID], lodging: [ID], thingsToDo: [ID], transportation: [ID]
    addFood(profileId: ID!, city: String!, state: String!, address: String!, phone: String, category: String!, cost: Int!, images: [String], reviews: [String], starRating: Int): Food
    removeProfile: Profile
  }
`;

module.exports = typeDefs;
