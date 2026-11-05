
const {
  initializeApp,
  getApps,
  cert,
} = require("firebase-admin/app");

const { getAuth } = require("firebase-admin/auth");
const path = require("path");

const serviceAccountPath = path.join(
  __dirname,
  "../../secrets/firebase-service-account.json"
);

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccountPath),
      })
    : getApps()[0];

const adminAuth = getAuth(app);

module.exports = adminAuth;
