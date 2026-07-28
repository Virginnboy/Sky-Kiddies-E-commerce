import api from "../src/api/axios";
import { jwtDecode } from "jwt-decode"

export const tokenIsExpired = (token)=> {
  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      return true
    }

    const currentTime = Date.now() / 1000

    return decoded.exp < currentTime;
  } catch (err) {
    return true
  }
}