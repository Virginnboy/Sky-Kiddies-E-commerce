import Input from "../components/Input";
import { forgotPasswordMutation } from "../auth/auth";
import "../pages/ForgotPassword.css";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export default function ForgotPassword() {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: forgotPasswordMutation,

    onSuccess: (res)=> {
      toast.success(res?.message)
    },

    onError: (err)=> {
      console.log(err.response?.data?.message)
    }
  });

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email")
    mutate(email, {
      onSuccess: ()=> {
        e.target.reset()
      }
    });
  };

  return (
    <form method="post" className="forgot-password-container" onSubmit={handleSubmit}>
      <div className="forgot-password-border">
        <h1>Forgot Password</h1>

        <p className="forgot-password-description">
          Enter the email address associated with your account and we'll send you a password reset link.
        </p>

        {error && <p>{error.response?.data.message}</p>}
        <Input 
        label="Email"
        placeholder="enter your email here"
        name="email"
        />

        <div className="forgot-password-btn-container">
          <button type="submit" disabled={isPending}>{isPending? "Sending..." : "Send"}</button>
        </div>
      </div>
    </form>
  )
};



