const { Schema, model } = require("mongoose");
const jobSchema = require("./Job.js").schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    phone: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      required: false,
      minlength: 10,
      maxlength: 400,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
<<<<<<< HEAD
    isDriver: {
      type: Boolean,
      default: true,
=======
    driver: {
      type: Boolean,
      required: true
    },
    customer: {
      type: Boolean,
      required: true
    },
    position: {
      type: String,
      required: true
>>>>>>> 9144f34a1632c0edae3c7cb01b02ffee320f1cd1
    },
    jobs: [jobSchema],
  },``
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
