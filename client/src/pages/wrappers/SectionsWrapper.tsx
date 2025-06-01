import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ArticleMetaList } from "../../components/ArticleMetaList";
import { SectionList } from "../../components/SectionList";
import { CustomNavLink } from "../../components/ui/CustomNavLink";
import { BackIcon } from "../../components/ui/Icons";

export const SectionsWrapper = () => {
  const { sectionId } = useParams<{ sectionId?: string }>();
  const parsedSectionId = sectionId ? parseInt(sectionId) : undefined;

  return (
      <MainLayout>
        {parsedSectionId ? (
        <>
          <CustomNavLink to="/sections"> <BackIcon/> All sections </CustomNavLink>
          <p>Viewing section ID: {parsedSectionId}</p>
          <ArticleMetaList sectionId={parsedSectionId}/>
        </>
        ) : (
        <>
          <p>Viewing all sections</p>
          <SectionList/>
        </>
        )}
      </MainLayout>
    );
};