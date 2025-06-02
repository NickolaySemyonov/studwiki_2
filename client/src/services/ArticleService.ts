import axios from "axios";
import type { IArticle, IVersionMeta, IVersionData} from "./types";
import { version } from "react";

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

export const getVersionsMeta = async(articleId:number): Promise<IVersionMeta[]> =>{
  const response = await axios.get<{versionsMetadata: IVersionMeta[], error?:string}>(
    `${baseURL}versions`,
    {
      params: {article_id:articleId},
      withCredentials: true
    }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.versionsMetadata;
}

export const getVersion = async(versionId:number): Promise<IVersionData> =>{
  const response = await axios.get<{version: IVersionData, error?:string}>(
    `${baseURL}version`,
    {
      params: {version_id:versionId},
      withCredentials: true
    }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.version;
}







export const rollBackVersion = async(versionId:number): Promise<string> =>{
  const response = await axios.post<{ message?:string; error?: string }>(
    `${baseURL}rollback`,
    null,
    { 
      params: {version_id:versionId},
      withCredentials: true
     }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.message||"OK";
};
