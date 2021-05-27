const { Schema } = require("mongoose");

const addressSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    lat: {
      type: String
    },
    lng: {
      type: String
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = addressSchema;
