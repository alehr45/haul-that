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
    $aboutMe: String
    $customer: Boolean!
    $driver: Boolean!
    $position: String!
    $image: String
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      aboutMe: $aboutMe
      customer: $customer
      driver: $driver
      position: $position
      image: $image
      username: $username
      password: $password
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
    $realTime: Int
    $phone: String!
    $name: String!
    $email: String!
    $pickup: addressInput!
    $dropoff: addressInput!
  ) {
    addJob(
      date: $date
      category: $category
      description: $description
      distance: $distance
      realTime: $realTime
      phone: $phone
      name: $name
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
      status
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateStatus($_id: ID!){
    updateStatus(_id: $_id) {
      _id
      status
    }
  }
`;

export const DELETE_JOB = gql`
  mutation deleteJob($_id: ID!) {
    deleteJob(_id: $_id) {
      _id
    }
  }
`;

export const COMPLETE_JOB = gql`
  mutation completeJob($_id: ID!) {
    completeJob(_id: $_id) {
      _id
      completed
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $aboutMe: String
    $customer: Boolean!
    $driver: Boolean!
    $position: String!
    $image: String
  ) {
    updateUser(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      aboutMe: $aboutMe
      customer: $customer
      driver: $driver
      position: $position
      image: $image
    ) {
      _id
    }
  }
`;

export const UPDATE_JOB_DRIVER = gql`
  mutation updateJobDriver($_id: ID!, $driverUsername: String!) {
    updateJobDriver(_id: $_id, driverUsername: $driverUsername) {
      _id
      driverUsername
    }
  }
`;

// export const UPDATE_IMAGE = gql`
//   mutation updateImage($_id: ID!, $image: String) {
//     updateImage(_id: $id) {
//       _id
//       image
//     }
//   }
// `;