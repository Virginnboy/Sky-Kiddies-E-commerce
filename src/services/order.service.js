import api from "../api/axios";

export const fetchOrders = async ()=> {
  const response = await api.get("/admin/order/orders");
  return response.data;
};

export const fetchOrderDetails = async (orderId) => {
  const response = await api.get(`/admin/order/order-details/${orderId}`);
  return response.data;
};

export const confirmOrder = async ({orderId, status}) => {
  const response = await api.patch(`/admin/order/confirm-order/${orderId}`, {status});
  return response.data;
};

export const declineOrder = async ({orderId, status, reason}) => {
  const response = await api.patch(`/admin/order/decline-order/${orderId}`, {status, reason});
  return response.data;
};