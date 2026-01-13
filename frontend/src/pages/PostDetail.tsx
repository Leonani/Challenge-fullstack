import { useParams } from "react-router-dom";
import { PostDetailContainer } from "../containers/PostDetailContainer";

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { post, loading } = PostDetailContainer(id!);

  if (loading) return <p>Cargando...</p>;
  if (!post) return <p>Post no encontrado</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 border p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p>{post.content}</p>
      {/* <p className="text-gray-500 mt-2">Autor: {post.user.name}</p> */}
    </div>
  );
};
