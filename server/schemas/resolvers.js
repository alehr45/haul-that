const { GraphQLScalarType } = require("graphql")
const { GraphQLDateTime } = require("graphql-iso-date")
const { Kind } = require("graphql/language")
const { User, Job } = require("../models")
const { AuthenticationError } = require("apollo-server-express")
const { signToken } = require("../utils/auth")
const { populate } = require("../models/User")

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A date and time, represented as an ISO-8601 string",
    serialize: value => value.toISOString(),
    parseValue: value => new Date(value),
    parseLiteral: ast => new Date(ast.value)
  }),
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        return userData
      }

      throw new AuthenticationError("Not logged in")
    },
    jobs: async () => {
      return Job.find().select("-__v -password")
    },
    job: async (parent, { _id }) => {
      return Job.findOne({ _id })
    },
    time: () => new Date(),
    users: async () => {
      return User.find()
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id })
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user) {
        throw new AuthenticationError("Incorrect credentials")
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials")
      }

      const token = signToken(user)
      return { token, user }
    },
    addJob: async (parent, args, context) => {
      if (context.user) {
        const job = Job.create({
          ...args,
          taken: false,
          status: 1,
          username: context.user.username
        })

        return job
      }
      throw new AuthenticationError("You need to be logged in!")
    },
    pickupJob: async (parent, { driverEmail, _id, distance, category, id }, context) => {
      if (context.user) {
        console.log(id)
        await Job.findOneAndUpdate({ _id: _id }, { driverEmail: driverEmail })
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              jobs: { driverEmail, _id, distance, category, id }
            }
          },
          { new: true }
        )

        return updatedUser
      }
    },
    updateJob: async (parent, { _id, taken, status }) => {
      const updatedJob = await Job.findOneAndUpdate({ _id }, { taken: taken, status: status }, { new: true })

      return updatedJob
    },

    updateStatus: async (parent, { _id, status }) => {
      console.log(_id)
      const updatedStatus = await Job.findOneAndUpdate({ _id }, { $inc: { status: 1 } }, { new: true })

      return updatedStatus
    },

    addVerification: async (parent, { _id }) => {
      const updatedJob = await Job.findOneAndUpdate({ _id }, { verificationCode: Math.floor(Math.random() * 10000000) }, { new: true })

      return updatedJob
    },

    updateJobDriver: async (parent, { _id, driver_id }) => {
      console.log(driver_id)
      const updatedJob = await Job.findOneAndUpdate({ _id }, { driver_id: driver_id }, { new: true })

      return updatedJob
    },

    completeJob: async (parent, { _id }) => {
      const completedJob = await Job.findOneAndUpdate({ _id }, { completed: true }, { new: true })

      return completedJob
    },
    deleteJob: async (parent, { _id }) => {
      await Job.findOneAndDelete({ _id })
    },

    updateImage: async (parent, { _id, image }) => {
      const updatedUser = await User.findOneAndUpdate({ _id: _id }, { image: image }, { new: true })

      return updatedUser
    },
    updateJobImage: async (parent, { _id, image }) => {
      const updatedJob = await Job.findOneAndUpdate({ _id: _id }, { image: image }, { new: true })

      return updatedJob
    },

    updateUser: async (parent, { _id, firstName, lastName, email, phone, aboutMe, customer, driver }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          aboutMe: aboutMe,
          customer: customer,
          driver: driver
        },
        { new: true }
      )

      return updatedUser
    },

    updatePosition: async (parent, { _id, customer, driver }) => {
      const updatedPosition = await User.findOneAndUpdate(
        { _id: _id },
        {
          customer: customer,
          driver: driver
        },
        { new: true }
      )

      return updatedPosition
    },

    findDriverAndRate: async (parent, { job_id, input }) => {
      console.log(input)
      const job = await Job.findOne({ _id: job_id })

      // now find driver based on driver_id from job
      const driver = await User.findOne({ _id: job.driver_id })

      let userRating = (parseFloat(driver.rating) + input).toString()

      const updatedDriver = await User.findOneAndUpdate(
        // user is found based on driver_id from job
        { _id: job.driver_id },
        // number of ratings is incremented - new TOTAL rating is stored
        { $inc: { ratingNumber: 1 }, rating: userRating },
        { new: true }
      )

      return updatedDriver
    },

    findCustomerAndRate: async (parent, { job_id, input }) => {
      console.log(input)
      const job = await Job.findOne({ _id: job_id })

      // now find customer based on customer_id from job
      const customer = await User.findOne({ _id: job.customer_id })

      // rating for current job added to driver rating TOTAL - converts to of type String
      let userRating = (parseFloat(customer.rating) + input).toString()

      const updatedCustomer = await User.findOneAndUpdate(
        // user is found based on driver_id from job
        { _id: job.customer_id },
        // number of ratings is incremented - new TOTAL rating is stored
        { $inc: { ratingNumber: 1 }, rating: userRating },
        { new: true }
      )

      // We now have 2 datapoints for rating - TOTAL rating and number of ratings
      // Add another datapoint in database for average rating and do logic here?
      // or simply do the math on the front end in query for user on profile?

      return updatedCustomer
    }
  }
}

// updateImage: async (parent, { _id, image }) => {
//   const updatedImage = await User.findOneAndUpdate(
//     { _id: _id },
//     {
//       image: image,

module.exports = resolvers
