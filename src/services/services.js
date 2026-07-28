import api from "../api/axios";

export const editProductMutation = async ({id, formData}) => {
  const response = await api.patch(`/admin/edit-product/${id}`, formData);
  return response.data;
};

export const uploadProductMutation = async (formData) => {
  const response = await api.post("/admin/uploadProduct", formData);
  return response.data;
};

export const addAccount = async (accountInfo)=> {
  const response = await api.post("/admin/add-account", accountInfo);
  return response.data;
};

export const fetchBankDetails = async ()=> {
  const response = await api.get("/admin/fetch-account");
  return response.data;
};

export const editAccountDetails = async ({accountId, editedInfo})=> {
  const response = await api.patch(`/admin/edit-account/${accountId}`, editedInfo);
  return response.data;
};

export const fetchOrders = async ()=> {
  const response = await api.get("/admin/orders");
  return response.data;
};

export const fetchOrderDetails = async (orderId) => {
  const response = await api.get(`/admin/order-details/${orderId}`);
  return response.data;
};

export const confirmOrder = async ({orderId, status}) => {
  const response = await api.patch(`/admin/confirm-order/${orderId}`, {status});
  return response.data;
};

export const declineOrder = async ({orderId, status, reason}) => {
  const response = await api.patch(`/admin/decline-order/${orderId}`, {status, reason});
  return response.data;
};

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