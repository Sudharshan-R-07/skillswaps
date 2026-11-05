
import api from "./api";

export const syncUserProfile = async () => {
  const response = await api.post("/auth/sync");
  return response.data;
};
