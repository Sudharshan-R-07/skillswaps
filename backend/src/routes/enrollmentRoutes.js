
const express = require("express");
const router = express.Router();

const verifyFirebaseToken = require("../middleware/authMiddleware");

const {
  enrollCourse,
  getMyEnrollments,
} = require("../controllers/enrollmentController");

router.post("/", verifyFirebaseToken, enrollCourse);

router.get("/my", verifyFirebaseToken, getMyEnrollments);

module.exports = router;
