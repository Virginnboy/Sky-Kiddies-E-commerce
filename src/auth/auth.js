import api from "../api/axios";

export const forgotPasswordMutation = async(email)=> {
  try{
    const response = await  api.post("/admin/forgot-password", {email});
  
    return response.data;

  }catch(err) {
    console.log(err)
    throw err
  }
}

export const resetPasswordMutation = async( {token, newPassword} ) => {
  try {
    const response = await api.post(`/admin/reset-password/${token}`, {newPassword});
  
    return response.data;

  }catch(err) {
    console.log(err)
    throw err
  }
};

export const loginMutation = async (data)=> {
  try {
    const response = await api.post("/admin/login", data);
    return response.data

  }catch (err) {
    console.log(err)
    throw err
  }
};

export const logOut = async() => {
  try {
    const response = await api.post( "/admin/logout" );
  
    return response.data;
  }catch (err) {
    console.log(err)
    throw err
  }
};

export const checkAuth = async ()=> {
  try {
    const response = await api.get("/admin/auth-check")
  
    return response.data 

  }catch (err) {
    console.log(err)
    throw err
  }
};
