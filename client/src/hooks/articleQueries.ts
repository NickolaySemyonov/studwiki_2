import { useQuery } from "@tanstack/react-query";
import { getArticles, getSections } from "../services/EditorService";
import type { IArticleMeta } from "../services/types";

export const useSectionsQuery = () => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: getSections
  });
};

export const useArticlesQuery = (sectionId: number) => {
  return useQuery<IArticleMeta[], Error>({
    queryKey: ['articles-section', sectionId], // Include sectionId in query key
    queryFn: () => getArticles(sectionId), // Pass sectionId to your function
    enabled: !!sectionId, // Only run query when sectionId exists
  });
};
export const useArticleQuery = (articleId: number) => {
  return useQuery<IArticleMeta[], Error>({
    queryKey: ['articles', articleId], 
    queryFn: () => getArticles(articleId), 
    enabled: !!articleId, 
  });
};