const { Schema, model } = require("mongoose");
const addressSchema = require('./Address')
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const dateFormat = require('../utils/dateFormat');

const jobSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    distance: {
      type: String,
      required: true,
    },
    pickup: addressSchema,

    dropoff: addressSchema,
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Job = model('Job', jobSchema);

module.exports = Job;
