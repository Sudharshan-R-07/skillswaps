
const Enrollment = require("../models/Enrollment");

// Enroll in course
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId, courseTitle } = req.body;

    if (!courseId || !courseTitle) {
      return res.status(400).json({
        success: false,
        message: "Course ID and title are required",
      });
    }

    const existing = await Enrollment.findOne({
      firebaseUid: req.user.uid,
      courseId,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Already enrolled in this course",
        enrollment: existing,
      });
    }

    const enrollment = await Enrollment.create({
      firebaseUid: req.user.uid,
      courseId,
      courseTitle,
    });

    return res.status(201).json({
      success: true,
      message: "Course enrollment successful",
      enrollment,
    });
  } catch (error) {
    console.error("ENROLL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get logged-in user's enrolled courses
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      firebaseUid: req.user.uid,
    }).sort({ enrolledAt: -1 });

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
