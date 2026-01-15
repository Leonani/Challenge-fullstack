import { usePosts } from "../hooks/usePosts";
import { PostCard } from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PostsContainer = () => {
  const navigate = useNavigate();
  const { userId } = useAuth(); // ✅ usamos userId del context

  const { posts, page, totalPages, setPage, loading, error } = usePosts();

  if (loading) return <p className="text-center">Cargando posts...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  const handleEdit = (postId: string) => {
    navigate(`/posts/edit/${postId}`);
  };

  return (
    <div className="space-y-4">
      {posts.length === 0 && (
        <p className="text-center text-gray-500">No hay posts para mostrar</p>
      )}

      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.user?.name || "Desconocido"}
            authorId={post.user?.id ?? ""}
            onEdit={userId === post.user?.id ? handleEdit : undefined} // ✅ comparamos por ID
          />
        ))}
      </div>
      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-6 items-center">
          {/* Botón anterior */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded-full disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            &lt;
          </button>

          {/* Páginas */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded-full transition-colors ${p === page
                  ? "bg-blue-500 text-white"
                  : "border hover:bg-gray-100"
                }`}
            >
              {p}
            </button>
          ))}

          {/* Botón siguiente */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded-full disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            &gt;
          </button>
        </div>

      )}
    </div>
  );
};
