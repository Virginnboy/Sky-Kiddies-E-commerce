import { Form, useNavigation } from "react-router-dom";
import Input from "./Input";
import "../components/AuthForm.css"

export default function AuthForm( {type = "signup"} ) {
  const isSubmiting = useNavigation().state === "submitting"
  const isSignup = type === "signup"

  return (
    <Form method="post">
      <div className="container">
      <Input label="First Name" name="firstName" type="text"/>
      <Input label="Email" name="email" type="email"/>
      <Input label="Password" name="password" type="password" autoComplete="password"/>
      {isSignup && <Input label= "confirm Password" name="confirm-password" type="password" autoComplete="confirm-password"/>}

      <div className="signup-btn">
        <button type="submit" disabled={isSubmiting}>{isSubmiting? "Signing up..." : "Sign up"}</button>
      </div>
      </div>
    </Form>
  )
}