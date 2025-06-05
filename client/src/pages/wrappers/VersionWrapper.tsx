import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { VersionManager } from "../VersionManager";
import { CustomNavLink } from "../../components/ui/CustomNavLink";
import { BackIcon } from "../../components/ui/Icons";

export const VersionWrapper = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const parsedArticleId = articleId ? parseInt(articleId) : undefined;

  return (
    <MainLayout>
        {parsedArticleId ? (
        <><div className="flex items-center gap-4 mb-6">
                <CustomNavLink to={`/articles/${articleId}`}>
                    <BackIcon /> Назад
                </CustomNavLink>
                
            </div>
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