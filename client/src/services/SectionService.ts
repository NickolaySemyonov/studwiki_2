import axios from "axios";
import type { IArticleMeta, ISectionMeta } from "./types";

const baseURL = 'http://localhost:5000/api.sections/';

export const getSections = async(): Promise<ISectionMeta[]> => {
  const response = await axios.get<{sections: ISectionMeta[], error?: string}>(
    `${baseURL}`,
    { 
      withCredentials: true 
    }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.sections;

};


export const getArticlesMeta = async(sectionId:number): Promise<IArticleMeta[]> => {
  const response = await axios.get<{articlesMetadata: IArticleMeta[], error?: string}>(
    `${baseURL}section`,
    { 
      params: { section_id: sectionId },
      withCredentials: true 
    }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.articlesMetadata;

};