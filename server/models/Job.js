const { Schema, model } = require("mongoose");
const addressSchema = require("./Address");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const dateFormat = require("../utils/dateFormat");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const jobSchema = new Schema(
  {
    date: {
      type: String,
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

jobSchema.plugin(AutoIncrement, { inc_field: "id" });

const Job = mongoose.model("Job", jobSchema);


module.exports = Job;
