
const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      index: true,
    },

    courseId: {
      type: String,
      required: true,
    },

    courseTitle: {
      type: String,
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["ENROLLED", "IN_PROGRESS", "COMPLETED"],
      default: "ENROLLED",
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// One enrollment per user per course
enrollmentSchema.index(
  { firebaseUid: 1, courseId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
