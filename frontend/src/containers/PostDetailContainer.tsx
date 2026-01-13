import { usePost } from "../hooks/usePostsDetail";

export const PostDetailContainer = (postId: string) => {
  const { post, loading } = usePost(postId);

  return { post, loading };
};
