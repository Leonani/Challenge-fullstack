interface PostCardProps {
  title: string;
  content: string;
  author?: string;
}

export const PostCard = ({ title, content, author }: PostCardProps) => {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mb-2">{content}</p>

      {author && (
        <p className="text-sm text-gray-500">
          Autor: {author}
        </p>
      )}
    </div>
  );
};
