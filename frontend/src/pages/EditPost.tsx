import { useParams } from "react-router-dom";
import { useEditPost } from "../hooks/useEditPost";
import { PostForm } from "../components/PostForm";

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>ID de post no especificado</p>;

  const { post, submit, loading, error, success } = useEditPost(id);

  if (loading) return <p>Cargando...</p>;
  if (!post) return <p>Post no encontrado</p>;

  const handleSubmit = (data: { title: string; content: string }) => {
    submit(data);
  };

  return (
    
      <PostForm
        defaultTitle={post.title}
        defaultContent={post.content}
        onSubmit={handleSubmit}
        loading={loading}
        error={error || undefined}
        success={success}
      />

  );
};

export default EditPost;
