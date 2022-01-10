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
    aboutMe: String
    customer: Boolean!
    driver: Boolean!
    position: String!
    image: String
    jobs: [Job]
    ratingNumber: Int
    rating: String
  }

  type Job {
    id: ID
    _id: ID
    date: String!
    category: String!
    createdAt: String
    description: String!
    image: String
    distance: String!
    price: Int
    realTime: Int
    taken: Boolean
    status: Int
    completed: Boolean
    phone: String!
    name: String!
    email: String!
    driver_id: String
    verificationCode: Float
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
      aboutMe: String
      customer: Boolean!
      driver: Boolean!
      image: String
      position: String!
    ): Auth
    login(username: String!, password: String!): Auth
    addJob(
      date: String!
      category: String!
      description: String!
      image: String
      distance: String!
      price: Int
      realTime: Int
      phone: String!
      name: String!
      email: String!
      pickup: addressInput!
      dropoff: addressInput!
    ): Job
    pickupJob(_id: ID!, distance: String!, category: String!, id: String!): User
    updateJob(_id: ID!, taken: Boolean, status: Int): Job
    updateStatus(_id: ID!): Job
    addVerification(_id: ID!): Job
    updateJobDriver(_id: ID!, driver_id: String!): Job
    completeJob(_id: ID!): Job
    deleteJob(_id: ID!): Job
    updateImage(_id: ID!, image: String!): User
    updateJobImage(_id: ID!, image: String!): Job
    updateUser(
      _id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      aboutMe: String
      customer: Boolean
      driver: Boolean
      position: String
    ): User
    findDriverAndRate(job_id: ID!, input: Int!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
