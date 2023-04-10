import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_LOCATION = gql`
  mutation Mutation($city: String!, $state: String!) {
    addLocation(city: $city, state: $state) {
      _id
      city
      profileId
      state
    }
  }
`;

export const ADD_TRIP = gql`
  mutation AddTrip($locationId: ID!, $dateOfTrip: String!) {
    addTrip(locationId: $locationId, dateOfTrip: $dateOfTrip) {
      _id
      dateOfTrip
    }
  }
`;
