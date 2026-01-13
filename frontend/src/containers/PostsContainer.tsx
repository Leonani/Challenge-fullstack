import { usePosts } from "../hooks/usePosts";
import { PostCard } from "../components/PostCard";

export const PostsContainer = () => {

  const {
    posts,
    page,
    totalPages,
    setPage,
    loading,
    error,
  } = usePosts();

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-4">
      {posts.length === 0 && (
        <p className="text-center text-gray-500">
          No hay posts para mostrar
        </p>
      )}

      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          content={post.content}
          author={post.user?.name}
        />
      ))}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex gap-4 justify-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
