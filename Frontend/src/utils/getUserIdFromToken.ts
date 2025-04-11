// utils/getUserIdFromToken.ts
export function getUserIdFromToken() {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || null;
  }
  