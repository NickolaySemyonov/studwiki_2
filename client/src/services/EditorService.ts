import axios from "axios";
import type { INewArticle } from "./types";
const baseURL = 'http://localhost:5000/api.articles/';

export const createArticle = async (data: INewArticle): Promise<string> => {
    
    const response = await axios.post<{ message?:string; error?: string }>(
        `${baseURL}create`,
        data,
        { withCredentials: true }
    );
    if (response.data.error) {
        throw new Error(response.data.error);
    }
    return response.data.message||"OK";
};


export const editArticle = async (delta: string, articleId:number): Promise<string> => {
  const response = await axios.post<{ message?:string; error?: string }>(
    `${baseURL}edit/${articleId}`,
    delta,
    { withCredentials: true }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.message||"OK";
};




// export const getArticle = async(articleId:number): Promise<IArticle> => {
//   const response = await axios.get<{article: IArticle, error?: string}>(
//     `${baseURL}articles`,
//     { 
//       params: { article_id: articleId },
//       withCredentials: true 
//     }
//   );
//   if (response.data.error) {
//     throw new Error(response.data.error);
//   }
//   return response.data.article;

// };

