import { PencilIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  onEdit?: (id: string) => void;
};

export const PostCard = ({ id, title, content, author, authorId, onEdit }: PostCardProps) => {
  const { userId } = useAuth();
  const canEdit = !!userId && userId === authorId;
  const navigate = useNavigate();
  console.log(userId, authorId)
  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-6 mb-4 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto transition-transform hover:scale-[1.02]">

      
      {canEdit && onEdit && (
        <button
          onClick={() => navigate(`/posts/edit/${id}`)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition-colors"
          title="Editar"
        >
          <PencilIcon className="w-5 h-5 text-blue-500 hover:text-blue-600 transition-colors" />
        </button>
      )}

      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{content}</p>

      {author && (
        <p className="text-sm text-gray-500 mb-2">Autor: {author}</p>
      )}
    </div>
  );
};
