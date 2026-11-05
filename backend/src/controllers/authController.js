
const User = require("../models/User");

exports.syncUser = async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      user = await User.create({
        firebaseUID: uid,
        email,
        name: name || email.split("@")[0],
        photoURL: picture || "",
        role: "LEARNER",
      });
    } else {
      user.firebaseUID = uid;
      user.email = email;

      if (name) user.name = name;
      if (picture) user.photoURL = picture;

      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "User profile synchronized",
      user,
    });
  } catch (error) {
    console.error("Sync user error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to synchronize user profile",
    });
  }
};
