
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "Development" },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: { type: String, default: "Self-paced" },
    instructorName: { type: String, default: "SkillSwap Instructor" },
    thumbnail: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    outcomes: [{ type: String }],
    curriculum: [
      {
        title: String,
        lessons: [{ type: String }],
      },
    ],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
