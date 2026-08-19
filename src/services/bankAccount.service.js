import api from "../api/axios";

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