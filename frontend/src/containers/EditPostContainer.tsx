import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useEditPost } from "../hooks/useEditPost";

export const EditPostContainer = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error("Post ID requerido");

  const { post, submit, loading, error, success } = useEditPost(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Llenar los valores iniciales cuando cargue el post
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (data: { title: string; content: string }) => {
    submit(data);
  };

  return {
    defaultTitle: title,
    defaultContent: content,
    onSubmit: handleSubmit,
    loading,
    error,
    success,
  };
};

