import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ArticleViewer } from "../ArticleViewer";

export const ArticlesWrapper = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const parsedArticleId = articleId ? parseInt(articleId) : undefined;

  return (
    <MainLayout>
        {parsedArticleId ? (
        <>
          <p>Viewing article ID: {parsedArticleId}</p>
          <ArticleViewer articleId={parsedArticleId}/>
        </>
        ) : (
        <>
          <p>Search for articles</p>
        </>
        )}


    </MainLayout>


  );
}