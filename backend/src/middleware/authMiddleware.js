
const adminAuth = require("../config/firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    const token = authHeader.substring(7);

    const decodedToken = await adminAuth.verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
    };

    next();
  } catch (error) {
    console.error(
      "Firebase verification error:",
      error.code,
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired Firebase token",
      errorCode: error.code,
    });
  }
};

module.exports = verifyFirebaseToken;
