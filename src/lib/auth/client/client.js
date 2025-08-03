async function apiPost(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    const contentType = res.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
  
    if (!res.ok) {
      const error = isJson ? await res.json() : { error: await res.text() };
      throw new Error(error?.error || `Request failed: ${res.status}`);
    }
  
    return isJson ? res.json() : {};
  }
  
  export const checkEmail = (email) => apiPost("/api/public/auth/signup/check-email", { email });
  export const sendOtp = (email) => apiPost("/api/public/auth/signup/sendotp", { email });
  export const verifyOtp = (email, otp) => apiPost("/api/public/auth/signup/verify", { email, otp });
  export const register = ({ username, email, password }) =>
    apiPost("/api/public/auth/signup/register", { username, email, password });
  export const changePassword = ({ oldPassword, newPassword }) =>
    apiPost("/api/user/change-password", { oldPassword, newPassword });