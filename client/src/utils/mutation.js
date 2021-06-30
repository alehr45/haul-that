import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $username: String!
    $password: String!
<<<<<<< HEAD
    
=======
>>>>>>> b1241488fde9263e1f137004e81278f23aa2119c
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      username: $username
      password: $password
<<<<<<< HEAD
      
=======
>>>>>>> b1241488fde9263e1f137004e81278f23aa2119c
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_JOB = gql`
  mutation addJob(
    $date: String!
    $category: String!
    $description: String!
    $distance: String!
    $phone: String!
    $email: String!
    $pickup: addressInput!
    $dropoff: addressInput!
  ) {
    addJob(
      date: $date
      category: $category
      description: $description
      distance: $distance
      phone: $phone
      email: $email
      pickup: $pickup
      dropoff: $dropoff
    ) {
      _id
    }
  }
`;

export const PICKUP_JOB = gql`
  mutation pickupJob(
    $_id: ID!
    $distance: String!
    $category: String!
    $id: String!
  ) {
    pickupJob(_id: $_id, distance: $distance, category: $category, id: $id) {
      jobs {
        _id
      }
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation updateJob($_id: ID!) {
    updateJob(_id: $_id) {
      _id
      taken
    }
  }
`;
