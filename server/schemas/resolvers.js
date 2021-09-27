const { GraphQLScalarType } = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const { Kind } = require("graphql/language");
const { User, Job } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { populate } = require("../models/User");

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A date and time, represented as an ISO-8601 string",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    jobs: async () => {
      return Job.find().select("-__v -password");
    },
    job: async (parent, { _id }) => {
      return Job.findOne({ _id });
    },
    time: () => new Date(),
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addJob: async (parent, args, context) => {
      if (context.user) {
        const job = Job.create({
          ...args,
          taken: false,
          status: 1,
          username: context.user.username,
        });

        return job;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    pickupJob: async (
      parent,
      { driverEmail, _id, distance, category, id },
      context
    ) => {
      console.log(driverEmail);
      if (context.user) {
        console.log(id);
        await Job.findOneAndUpdate({ _id: _id }, { driverEmail: driverEmail });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              jobs: { driverEmail, _id, distance, category, id },
            },
          },
          { new: true }
        );

        return updatedUser;
      }
    },
    updateJob: async (parent, { _id }) => {
      console.log(_id);
      const updatedJob = await Job.findOneAndUpdate(
        { _id },
        { taken: true },
        { new: true }
      );

      return updatedJob;
    },

    updateStatus: async (parent, { _id }) => {
      console.log(_id);
      const updatedStatus = await Job.findOneAndUpdate(
        { _id },
        { $inc: { status: 1 } },
        { new: true }
      );

      return updatedStatus;
    },

    updatePosition: async (parent, { _id }) => {
      console.log(_id);
      const updatedPosition = await Job.findOneAndUpdate(
        { _id },
        { $inc: { isDriver: false } },
        { new: true }
      );

      return updatedPosition;
    },

    updateJobDriver: async (parent, { _id, driverUsername }) => {
      console.log(_id, driverUsername);
      const updatedJob = await Job.findOneAndUpdate(
        { _id },
        { driverUsername: driverUsername },
        { new: true }
      );

      return updatedJob;
    },

    completeJob: async (parent, { _id }) => {
      console.log(_id);
      const completedJob = await Job.findOneAndUpdate(
        { _id },
        { completed: true },
        { new: true }
      );

      console.log(completedJob);

      return completedJob;
    },
    deleteJob: async (parent, { _id }) => {
      await Job.findOneAndDelete({ _id });
    },
    updateUser: async (
      parent,
      { _id, firstName, lastName, email, phone, aboutMe, customer, driver, position }
    ) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          aboutMe: aboutMe,
          customer: customer,
          driver: driver,
          position: position
        },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
