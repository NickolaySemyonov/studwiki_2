import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { CreateArticlePage } from "../CreateArticlePage";
import { EditArticlePage } from "../EditArticlePage";


export const EditorWrapper = () => {
  const { articleId } = useParams<{ articleId?: string }>();
  const parsedArticleId = articleId ? parseInt(articleId) : undefined;

  return (
      <MainLayout>
        {parsedArticleId ? (
        <>
          <EditArticlePage articleId={parsedArticleId}/>
        </>
        ) : (
        <>
          <CreateArticlePage/>
        </>
        )}
      </MainLayout>
    );
};