import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const useEditPost = (postId: string) => {
  const { token } = useAuth(); // ✅ traemos token del context
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/posts/${postId}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Error al cargar el post");
        const data = await res.json();
        setPost({ title: data.title, content: data.content });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, token]);

  const submit = async (data: { title?: string; content?: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al actualizar el post");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { post, submit, loading, error, success };
};

