
const Course = require("../models/Course");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      published: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid course ID",
    });
  }
};
