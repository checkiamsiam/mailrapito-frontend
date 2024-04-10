import { useQuery } from "@tanstack/react-query";
import {
  getAllBlogs,
  getAlsoLikeBlogs,
  getMostReadBlogs,
  getSingleBlog,
} from "../services/services";

export const useBlogs = (enabled = true) => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    enabled,
  });
};

export const useSingleBlog = (id: string) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => getSingleBlog(id),
    enabled: !!id,
  });
};

export const useMostReadBlogs = (id: string) => {
  return useQuery({
    queryKey: ["mostReadBlogs", id],
    queryFn: () => getMostReadBlogs(id),
    enabled: !!id,
  });
};

export const useAlsoLikeBlogs = (id: string) => {
  return useQuery({
    queryKey: ["alsoLikeBlogs", id],
    queryFn: () => getAlsoLikeBlogs(id),
  });
};
