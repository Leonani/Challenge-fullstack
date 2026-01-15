import { apiFetch } from "./api";

export const updatePost = (
  postId: string,
  data: { title?: string; content?: string }
) => {
  return apiFetch(`/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
