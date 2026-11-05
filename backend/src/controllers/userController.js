
const User = require("../models/User");

// Synchronize Firebase user with MongoDB

exports.syncUser = async (req, res) => {
  try {
    const { uid, email } = req.user;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email: email || "",
        displayName: "",
        photoURL: "",
        role: "LEARNER",
        bio: "",
        skills: [],
        location: "",
      });
    } else {
      user.email = email || user.email;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "User synchronized successfully",
      user,
    });
  } catch (error) {
    console.error("SYNC USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get logged-in user's profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      firebaseUid: req.user.uid,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update logged-in user's profile
exports.updateMyProfile = async (req, res) => {
  try {
    const allowedFields = [
      "displayName",
      "photoURL",
      "bio",
      "skills",
      "location",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Validate skills
    if (
      updates.skills !== undefined &&
      (!Array.isArray(updates.skills) ||
        !updates.skills.every(
          (skill) => typeof skill === "string"
        ))
    ) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array of strings",
      });
    }

    // Validate string fields
    for (const field of [
      "displayName",
      "photoURL",
      "bio",
      "location",
    ]) {
      if (
        updates[field] !== undefined &&
        typeof updates[field] !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a string`,
        });
      }
    }

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found. Sync first.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
