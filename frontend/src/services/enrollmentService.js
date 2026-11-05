
import api from "../api/api";

export const enrollCourse = async (courseId, courseTitle) => {
  const response = await api.post("/enrollments", {
    courseId,
    courseTitle,
  });

  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await api.get("/enrollments/my");
  return response.data;
};
