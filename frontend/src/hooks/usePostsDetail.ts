import { useState, useEffect } from "react";
import { apiFetch } from "../api/api";
import type { Post } from "./usePosts";

export const usePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await apiFetch(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading };
};
