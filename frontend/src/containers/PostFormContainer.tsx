import { useState } from "react";
import { apiFetch } from "../api/api";
import { useAuth } from "../context/AuthContext";

export const PostFormContainer = (initialData: { title: string; content: string } = { title: "", content: "" }) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert("Debes estar logueado");
    try {
      await apiFetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      alert("Post creado correctamente!");
      setTitle("");
      setContent("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return { title, setTitle, content, setContent, handleSubmit };
};
