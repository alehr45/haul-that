const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime

  type Query {
    helloWorld: String
    jobs: [Job]
    users: [User]
    time: DateTime
    me: User
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    jobs: [Job]
  }

  type Job {
    _id: ID
    date: DateTime
    category: String!
    createdAt: String
    description: String!
    distance: String!
    pickup: Address
    dropoff: Address
  }

  type Address {
    address: String!
    address2: String!
    city: String!
    state: String!
    zip: String!
    lat: String
    lng: String
  }

  input addressInput {
    address: String!
    address2: String!
    city: String!
    state: String!
    zip: String!
    lat: String
    lng: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      driver: String
      customer: String
    ): Auth
    login(email: String!, password: String!): Auth
    addJob(
      date: DateTime
      category: String!
      description: String!
      distance: String!
      pickup: addressInput!
      dropoff: addressInput!
    ): Job
    pickupJob(jobId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;

// scalar Date

// type MyType {
//   created: Date
// }


// input jobInput {
//   quantity: String!
//   category: String!
//   date: String!
//   description: String!
//   pickup: Address!
//   dropoff: Address!
// }