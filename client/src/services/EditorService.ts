import axios from "axios";
import type { IArticleEdit, INewArticle } from "./types";
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


export const editArticle = async (data:IArticleEdit): Promise<string> => {
  const response = await axios.post<{ message?:string; error?: string }>(
    `${baseURL}edit`,
    data,
    { withCredentials: true }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.message||"OK";
};



