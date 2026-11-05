
const express = require("express");
const router = express.Router();

const verifyFirebaseToken = require("../middleware/authMiddleware");

const {
  syncUser,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");

router.post("/sync", verifyFirebaseToken, syncUser);

router.get("/me", verifyFirebaseToken, getMyProfile);

router.patch("/me", verifyFirebaseToken, updateMyProfile);

module.exports = router;
