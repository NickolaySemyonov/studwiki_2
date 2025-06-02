import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { VersionManager } from "../VersionManager";

export const VersionWrapper = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const parsedArticleId = articleId ? parseInt(articleId) : undefined;

  return (
    <MainLayout>
        {parsedArticleId ? (
        <>
           <VersionManager articleId={parsedArticleId} />
        </>
        ) : (
        <>
          No paraameter provided
        </>
        )}
       
    </MainLayout>


  );
}