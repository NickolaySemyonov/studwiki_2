import { useQuery } from "@tanstack/react-query";
import type { IArticle} from "../services/types";
import { getArticle } from "../services/ArticleService";




export const useArticleQuery = (articleId: number) => {
  return useQuery<IArticle>({
    queryKey: ['articles', articleId], 
    queryFn: () => getArticle(articleId), 
    enabled: !!articleId, 
    // staleTime: 1000 * 30
  });
};