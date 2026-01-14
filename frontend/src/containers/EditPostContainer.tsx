import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEditPost } from "../hooks/useEditPost";

export const EditPostContainer = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error("Post ID requerido");

  const { submit, loading, error, success } = useEditPost(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ title, content });
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    handleSubmit,
    loading,
    error,
    success,
  };
};
