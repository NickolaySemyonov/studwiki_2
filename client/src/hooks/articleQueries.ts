import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type IVersionMeta, type IArticle, type IVersionData} from "../services/types";
import { getArticle, getVersion, getVersionsMeta, rollBackVersion } from "../services/ArticleService";




export const useArticleQuery = (articleId: number|undefined) => {
  return useQuery<IArticle>({
    queryKey: ['articles', articleId], 
    queryFn: () => getArticle(articleId), 
    enabled: !!articleId, 
    // staleTime: 1000 * 30
  });
};

export const useVersionMetaQuery = (articleId: number) =>{
  return useQuery<IVersionMeta[]>({
    queryKey:['versions', articleId],
    queryFn: () => getVersionsMeta(articleId),
    enabled: !!articleId
  })
}

export const useVersionDataQuery = (versionId: number) =>{
  return useQuery<IVersionData>({
    queryKey:['version', versionId],
    queryFn: () => getVersion(versionId),
    enabled: !!versionId
  })
}



export const useVersionRollbackMutation = () =>{

  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: rollBackVersion,
    onSuccess: (_, versionId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey:['versions']});
      queryClient.invalidateQueries({queryKey:['articles']});
    },
  });
};