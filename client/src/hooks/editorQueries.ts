import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle, editArticle } from "../services/EditorService";



export const useCreateArticleMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createArticle,
    onSuccess: (message) => {
      // Invalidate any queries that might be affected by this mutation
      // For example, if you have a list of articles:
      //queryClient.invalidateQueries({queryKey:['articles']});
      
      // You could also optionally set some query data directly
      // queryClient.setQueryData(['latestArticle'], message);
    },
    // Optional: Add onError handling if you want consistent error handling
    // onError: (error) => {
    //   console.error('Error creating article:', error);
    // }
  });
};

export const useEditArticleMutation = (articleId:number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: editArticle,
    onSuccess: (message) => {
      queryClient.invalidateQueries({queryKey:['articles', articleId]})
    },
  });
};