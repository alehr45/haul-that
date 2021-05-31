const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime

  type Query {
    helloWorld: String
    jobs: [Job]
    users: [User]
    time: DateTime
    me: User
    user(_id: String!): User
    job(_id: String!): Job
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    phone: String!
    jobs: [Job]
  }

  type Job {
    id: ID
    _id: ID
    date: String!
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
      username: String!
      email: String!
      phone: String!
      password: String!
      driver: String
      customer: String
    ): Auth
    login(email: String!, password: String!): Auth
    addJob(
      date: String!
      category: String!
      description: String!
      distance: String!
      pickup: addressInput!
      dropoff: addressInput!
    ): Job
    pickupJob(_id: ID!, distance: String!, category: String!, id: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;


//    user(_id: String!): User
