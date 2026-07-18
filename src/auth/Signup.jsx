import "../auth/Signup.css";
import AuthForm from "../components/AuthForm";
import { Link, redirect, useActionData, useNavigation } from "react-router-dom";
import api from "../axios"

const Signup = () => {
  const data = useActionData();
  const isSubmiting = useNavigation().state === "submitting"

  return (
    <div className="signup-container">
      <div className="signup-form">
      <h1>Sign Up</h1>
      {data && <p>{data.message}</p>}
      <AuthForm type="signup" data={data}/>
      <p>Already have an account? <Link to="/login" className="login-here">Login here</Link></p>
      </div>
    </div>
  )
}

export default Signup

export async function action({request}) {
    const data = await request.formData();

    const email = data.get("email");
    const firstName = data.get("firstName")
    const password = data.get("password");
    const confirmPassword = data.get("confirm-password")

    if (password !== confirmPassword) {
      return { message: "Password do not match"}
    }

    try {
      await api.post("/admin/signup", {email, firstName, password});

      return redirect("/login?signup=success")

    }catch(err) {
      console.log(err);
      return err.response?.data || { message: "Signup failed"}
    }
  }