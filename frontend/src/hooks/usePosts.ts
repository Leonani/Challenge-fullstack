import { useState, useEffect } from "react";
import { apiFetch } from "../api/api";

export interface Post {
  id: string;
  title: string;
  content: string;
  user?: { name: string, id: string };
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFetch(`/posts?page=${page}&limit=5`);

        setPosts(response.data ?? []);
        setTotalPages(response.meta?.lastPage ?? 1);

      } catch (err) {
        console.error("Error al obtener posts", err);
        setError("No se pudieron cargar los posts");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return {
    posts,
    page,
    totalPages,
    setPage,
    loading,
    error,
  };
};



