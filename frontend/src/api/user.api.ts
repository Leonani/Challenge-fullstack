import { apiFetch } from "./api";

export const updateProfile = (data: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  return apiFetch("/users/me", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
