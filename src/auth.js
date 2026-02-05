import api from "./axios";

export const forgotPasswordMutation = async(email)=> {
  const response = await  api.post("/forgot-password", {email});

  return response.data;
}

export const resetPasswordMutation = async( {token, newPassword} ) => {
  const response = await api.post(`/reset-password/${token}`, {newPassword});

  return response.data;
};

export const loginMutation = async (data)=> {
  const response = await api.post("/login", data);

  console.log(response)
  
  return response.data
};

export const logOut = async() => {
  try {
    const response = await api.post( "/logout" );
  
    return response.data;
  }catch (err) {
    console.log(err)
    throw err
  }
};

export const checkAuth = async ()=> {
  const response = await api.get("/auth-check")

  return response.data
};
