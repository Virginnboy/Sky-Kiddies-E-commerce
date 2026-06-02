
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../components/Input";
import "../auth/Login.css";
import { loginMutation } from "../auth";
import toast from "react-hot-toast";

const Login =()=>{
  const [ showSignupMsg, setShowSignupMsg ] = useState(false)
  const [ showResetPasswordMsg, setShowResetPasswordMsg ] = useState(false)
  
  const [ searchParams ] = useSearchParams()
  const signupSuccess = searchParams.get("signup") === "success";
  const resetPasswordSuccess = searchParams.get("reset-password") === "success"

  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const {mutate, isPending} = useMutation({
    mutationFn: loginMutation,

    onSuccess: (data) => {
      // console.log(data);
      const adminToken = data?.token
      const adminData = data?.user
      
      localStorage.setItem("adminToken", adminToken);
      localStorage.setItem("adminData", JSON.stringify(adminData));
      queryClient.setQueryData(["adminAuth"], {
        authenticated: true,
        user: data?.user
      });

      navigate("/admin-dashboard");
      toast.success(data?.message);
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.response?.data?.message || "Login Failed");
    }
  });

  const handleLogin = (e)=> {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    mutate(data);
  }

  useEffect(()=> {
    if (signupSuccess) {
      setShowSignupMsg(true);

      const timer = setTimeout(()=>{
        setShowSignupMsg(false)
      }, 3000);

      return ()=> clearTimeout(timer)
    }
  }, [signupSuccess]);

  useEffect(()=> {
    if (resetPasswordSuccess) {
      setShowResetPasswordMsg(true);

      const timer = setTimeout(()=>{
        setShowResetPasswordMsg(false)
      }, 3000);

      return ()=> clearTimeout(timer);
    }


  }, [resetPasswordSuccess]);

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h1>Log In</h1>
        {showSignupMsg && <p className="success-signup">Signup successful! Please login to continue</p>}
        {showResetPasswordMsg && <p className="success-reset-password">Reset password successful! Please login to continue</p>}

        <Input 
          label="Email" 
          name="email" 
          type="email"
        />

        <Input 
          label="Password" 
          name="password" 
          type="password" 
          autoComplete="password"
        />

        <div className= "login-btn">
          <Link to="/forgot-password" className="forgot-password">Forgotten password?</Link>
          <button type="submit" disabled={isPending}>{isPending? "Logging in..." : "Login"}</button>
        </div>

        
        
      <p>You don't have an account yet? <Link to="/signup" className="signup-here">Signup here</Link></p>
      </form>

    </div>
  )
}

export default Login;



