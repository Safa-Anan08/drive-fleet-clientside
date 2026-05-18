export const getUser = () => {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("user"));
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};