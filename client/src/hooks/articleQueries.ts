import { useQuery } from "@tanstack/react-query";
import { getArticlesMeta, getSections } from "../services/EditorService";
import type { IArticleMeta } from "../services/types";

export const useSectionsQuery = () => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: getSections
  });
};

export const useArticlesMetaQuery = (sectionId: number) => {
  return useQuery<IArticleMeta[]>({
    queryKey: ['section', sectionId], 
    queryFn: () => getArticlesMeta(sectionId), 
    enabled: !!sectionId, 
    staleTime: 1000 * 30
  });
};
// export const useArticleQuery = (articleId: number) => {
//   return useQuery<IArticleMeta[], Error>({
//     queryKey: ['articles', articleId], 
//     queryFn: () => getArticles(articleId), 
//     enabled: !!articleId, 
//   });
// };