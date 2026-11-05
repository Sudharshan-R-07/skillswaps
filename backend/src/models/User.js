
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    displayName: {
      type: String,
      default: "",
      trim: true,
    },

    photoURL: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["LEARNER", "RESOURCE_PERSON", "ADMIN"],
      default: "LEARNER",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    skills: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("User", userSchema);
