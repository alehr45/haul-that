const { GraphQLScalarType } = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");
const { Kind } = require("graphql/language");
const { User, Job } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");


const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A date and time, represented as an ISO-8601 string",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value),
  }),
  Query: {
    jobs: async () => {
      return Job.find().select("-__v -password");
    },
    time: () => new Date(),
    users: async () => {
      return User.find()
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);

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
          username: context.user.username,
        });

        return job;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    pickupJob: async (parent, { jobId }, context) => {
      console.log(jobId)
      if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          { $push: { jobs: jobId } },
          { new: true }
        )

        return updatedUser

<<<<<<< HEAD
const resolvers = {
    Query: {
      helloWorld: () => {
        return 'hello world!';
=======
>>>>>>> 1c356adfb582cbb11f1ab7517c0bf90a3be12969
      }
    }
  },
};


module.exports = resolvers;
