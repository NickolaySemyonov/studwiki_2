import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ArticleMetaList } from "../../components/ArticleMetaList";
import { SectionList } from "../../components/SectionList";
import { CustomNavLink } from "../../components/ui/CustomNavLink";
import { BackIcon } from "../../components/ui/Icons";
import { useSectionQuery } from "../../hooks/sectionQueries";

export const SectionsWrapper = () => {
  const { sectionId } = useParams<{ sectionId?: string }>();
  const parsedSectionId = sectionId ? parseInt(sectionId) : undefined;
  
  const {data} = useSectionQuery(parsedSectionId);
  return (
      <MainLayout>
        {parsedSectionId ? (
        <>
          <div className="flex row">
            <CustomNavLink to="/sections"> <BackIcon/> Назад </CustomNavLink>
            <h1 className="flex items-center p-3 rounded-lg
             text-gray-300 text-xl">Раздел: {data?.name}</h1>
          </div>
          
          <ArticleMetaList sectionId={parsedSectionId}/>
        </>
        ) : (
        <>
          {/* <p>Viewing all sections</p> */}
          <SectionList/>
        </>
        )}
      </MainLayout>
    );
};