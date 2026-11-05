
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const enrollmentRoutes = require("./src/routes/enrollmentRoutes");
const app = express();
const courseRoutes = require("./src/routes/courseRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillSwap Backend Running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`SkillSwap Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};
app.use("/api/courses", courseRoutes);

startServer();
