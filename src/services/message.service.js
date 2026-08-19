import api from "../api/axios";

export const fetchUserChats = async () => {
  const response = await api.get("/admin/chats");
  return response.data;
};

export const fetchUserMessages = async (userId) => {
  const response = await api.get(`/admin/message/${userId}`);
  return response.data;
};

export const getSenderData = async (senderId)=> {
  const response = await api.get(`/admin/sender_data/${senderId}`);
  return response.data;
};