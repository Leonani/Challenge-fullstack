import { EditPostContainer } from "../containers/EditPostContainer";
import { PostForm } from "../components/PostForm";

export const EditPost = () => {
  const container = EditPostContainer();
  return <PostForm {...container} />;
};
