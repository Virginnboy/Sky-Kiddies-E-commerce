import Input from "./Input";
import axios from "axios";
import "../components/ResetPassword.css";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

const ResetPassword = () => {
  const isSubmiting = useNavigation().state === "submitting";
  const data = useActionData();


  return (
    <Form method="post" className="reset-password-container">
      <div className="reset-password-box">
        <h1>Reset Password</h1>
        {data && <p>{data.message}</p>}
        <Input 
          label="Password" 
          name="new-password" 
          id="reset-password"
          type="password"
          autoComplete ="new-password"
          />

        <Input 
          label="Confirm Password" 
          name="confirm-new-password" 
          id="confirm-new-password"
          type="password"
          autoComplete="new-password"
          />

        <div className="reset-password-btn-container">
          <button type="submit" disabled={isSubmiting}>{isSubmiting ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </Form>
  )
}

export default ResetPassword;

export const action = async ({request, params})=> {
  const token = params.resetPasswordToken
  const data = await request.formData()

  const newPassword = data.get("new-password")
  const confirmNewPassword = data.get("confirm-new-password")

  if (newPassword !== confirmNewPassword) {
    return {message: "Password do not match"}
  }

  if (!newPassword || !confirmNewPassword) {
  return { message: "All fields are required" };
}

  try {
    await axios.post("http://localhost:5000/admin/reset-password/" + token, {newPassword});

    return redirect("/login?reset-password=success")
  }catch (err) {
    return err.response?.data || { message: "Reset failed! try again"}
  }
};