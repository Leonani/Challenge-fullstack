import { useState } from "react";
import { updatePost } from "../api/post.api";

export const useEditPost = (postId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: { title?: string; content?: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updatePost(postId, data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al actualizar post");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, success };
};
