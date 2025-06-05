import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ArticleViewer } from "../ArticleViewer";
import { useArticleQuery } from "../../hooks/articleQueries";
import { CustomNavLink } from "../../components/ui/CustomNavLink";
import { BackIcon } from "../../components/ui/Icons";

export const ArticlesWrapper = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const parsedArticleId = articleId ? parseInt(articleId) : undefined;

  // const {data } = useArticleQuery(parsedArticleId);




  return (
    <MainLayout>
        {parsedArticleId ? (
        <div>
          {/* <p>Viewing article ID: {parsedArticleId}</p> */}
          
          <ArticleViewer articleId={parsedArticleId}/>
        </div>
        ) : (
        <>
          <p>Search for articles</p>
        </>
        )}


    </MainLayout>


  );
}