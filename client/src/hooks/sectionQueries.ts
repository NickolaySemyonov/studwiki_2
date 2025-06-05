import { useQuery } from "@tanstack/react-query";
import { getArticlesMeta, getSections, getSection } from "../services/SectionService";
import type { IArticleMeta, ISectionMeta } from "../services/types";

export const useSectionsQuery = () => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: getSections
  });
};

export const useSectionQuery = (sectionId:number|undefined) => {
  return useQuery<ISectionMeta>({
    queryKey: ['section-meta', sectionId],
    queryFn: () => getSection(sectionId),
    enabled: !!sectionId, 
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
