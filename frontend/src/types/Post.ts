export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
};

export type PaginatedPosts = {
  data: Post[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};