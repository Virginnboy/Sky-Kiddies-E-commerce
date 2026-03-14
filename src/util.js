import api from "./axios";


export const editProductMutation = async ({id, formData}) => {
  try {
    const response = await api.patch(`/edit-product/${id}`, formData)

    return response.data
    
  } catch (err) {
    console.log(err);
    return err.response.data
  }
}

export const uploadProductMutation = async (formData) => {
  try {
    const response = await api.post("/uploadProduct", formData);

    return response.data

  }catch (err) {
    console.log(err)
    throw err
  }
};

export const addAccount = async (accountInfo)=> {
  try {
    const response = await api.post("/add-account", accountInfo);

    return response.data
  }catch (err) {
    console.error(err)
    throw err
  }
}

export const fetchBankDetails = async ()=> {
  try {
    const response = await api.get("/fetch-account")

    return response.data

  } catch(err) {
    console.log(err)
    throw err
  }
}

export const editAccountDetails = async ({accountId, editedInfo})=> {
  console.log(accountId)
  console.log(editedInfo)
  try {
    const response = await api.patch(`/edit-account/${accountId}`, editedInfo);

    return response.data
  }catch (err) {
    console.log(err)
    throw err
  }
}

export const fetchOrders = async ()=> {
  try {
    const response = await api.get("/orders");
    return response.data
  }catch(err) {
    console.log(err)
    throw err
  }
}

export const fetchOrderdetails = async (orderId) => {
  try {
    const response = await api.get(`/order-details/${orderId}`)
    return response.data
  }catch (err) {
    console.log(err)
    throw err
  }
}

export const confirmOrder = async ({orderId, status}) => {
  try {
    const response = await api.patch(`/confirm-order/${orderId}`, {status})
    console.log(response)
    return response.data
  }catch (err) {
    console.log(err);
    throw err
  }
}

