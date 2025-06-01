import axios from "axios";
import type { IArticle} from "./types";

const baseURL = 'http://localhost:5000/api.articles/';


export const getArticle = async(articleId:number): Promise<IArticle> => {
  const response = await axios.get<{article: IArticle, error?: string}>(
    `${baseURL}article`,
    { 
      params: { article_id: articleId },
      withCredentials: true 
    }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.article;

};