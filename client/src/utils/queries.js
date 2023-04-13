import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;

export const QUERY_LOCATIONS = gql`
  query Query {
    locations {
      _id
      city
      state
      images
    }
  }
`;

export const QUERY_LOCATION = gql`
  query Location($locationId: ID!) {
    location(locationId: $locationId) {
      _id
      city
      state
      images
    }
  }
`;

export const QUERY_FOODBYSTATE = gql`
  query Location($locationId: ID!) {
    location(locationId: $locationId) {
      city
      state
      food {
        _id
        profileId
        city
        state
        address
        phone
        category
        cost
        images
        reviews
        starRating
      }
    }
  }
`;

export const QUERY_TRANSPORTATIONBYSTATE = gql`
  query Location($locationId: ID!) {
    location(locationId: $locationId) {
      city
      state
      transportation {
        _id
        profileId
        city
        state
        address
        phone
        category
        amenities
      }
    }
  }
`;

export const QUERY_LODGINGBYSTATE = gql`
  query Location($locationId: ID!) {
    location(locationId: $locationId) {
      city
      state
      lodging {
        _id
        profileId
        city
        state
        address
        phone
        category
        cost
        amenities
        images
        reviews
        starRating
      }
    }
  }
`;

export const QUERY_THINGSTODOBYSTATE = gql`
  query Location($locationId: ID!) {
    location(locationId: $locationId) {
      city
      state
      thingsToDo {
        _id
        profileId
        city
        state
        address
        phone
        category
        cost
        images
        reviews
        starRating
      }
    }
  }
`;