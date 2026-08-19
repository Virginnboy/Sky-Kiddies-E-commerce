import api from "../api/axios";

export const getOverViewStats = async () => {
  const response = await api.get("/admin/overview");
  return response.data;
}