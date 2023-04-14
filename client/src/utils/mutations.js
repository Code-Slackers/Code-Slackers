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

export const ADD_FOOD = gql`
  mutation Mutation($locationId: ID!, $city: String!, $state: String!, $address: String!, $category: String!, $cost: Int!, $phone: String, $images: [String], $starRating: Int) {
    addFood(locationId: $locationId, city: $city, state: $state, address: $address, category: $category, cost: $cost, phone: $phone, images: $images, starRating: $starRating) {
      _id
    }
  }
`;

export const ADD_LODGING = gql`
  mutation Mutation($locationId: ID!, $city: String!, $state: String!, $address: String!, $category: String!, $cost: Int!, $phone: String) {
    addLodging(locationId: $locationId, city: $city, state: $state, address: $address, category: $category, cost: $cost, phone: $phone) {
      _id
      address
      starRating
      phone
      city
      category
      cost
      state
    }
  }
`;

export const ADD_TRANSPORTATION = gql`
  mutation AddTransportation($locationId: ID!, $city: String!, $state: String!, $category: String!, $address: String, $phone: String) {
    addTransportation(locationId: $locationId, city: $city, state: $state, category: $category, address: $address, phone: $phone) {
      _id
      city
      profileId
      category
      state
    }
  }
`;

export const ADD_THINGS_TO_DO = gql`
  mutation AddThingsToDo($locationId: ID!, $city: String!, $state: String!, $address: String!, $category: String!, $cost: Int!, $phone: String) {
    addThingsToDo(locationId: $locationId, city: $city, state: $state, address: $address, category: $category, cost: $cost, phone: $phone) {
      _id
      address
      category
      city
      state
      cost
    }
  }
`;

export const UPDATE_FOOD = gql`
  mutation Mutation($foodId: ID!, $phone: String, $images: [String], $reviews: [String], $starRating: Int) {
    updateFood(foodId: $foodId, phone: $phone, images: $images, reviews: $reviews, starRating: $starRating) {
      _id
      category
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation Mutation($tripId: ID!, $food: [ID], $lodging: [ID], $thingsToDo: [ID], $transportation: [ID]) {
    updateTrip(tripId: $tripId, food: $food, lodging: $lodging, thingsToDo: $thingsToDo, transportation: $transportation) {
      _id
    }
  }
`;
