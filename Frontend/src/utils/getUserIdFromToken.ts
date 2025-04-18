// utils/getUserIdFromToken.ts
import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken() {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || null;
  }

  // utils/getUserDetailsFromToken.ts

  export function getUserDetailsFromToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    // Add debug logging to check decoded token contents
    // console.log("Decoded token:", decoded);
    return {
      id: decoded._id,
      name: decoded.name, 
      email: decoded.email,
    };
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
}
