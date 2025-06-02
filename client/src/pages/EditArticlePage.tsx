import { MainLayout } from './layouts/MainLayout';
import { useArticleQuery } from '../hooks/articleQueries';
import { EditForm } from './EditForm';
import { CustomLink } from '../components/ui/CustomLink';

interface ArticleEditorProps{
    articleId:number
}

export const EditArticlePage: React.FC<ArticleEditorProps>= ({articleId}) => {
    
    const { data: article, isLoading, isError } = useArticleQuery(articleId);
    

    if (isLoading) return <div>Loading article...</div>;
    if (isError) return <div>Error loading article</div>;
    if (!article) return <MainLayout><div>Article not found</div></MainLayout>;

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Article Editor</h1>
            <EditForm {...article}/>
            <CustomLink to={`/version_mgr/${articleId}`}></CustomLink>
        </>
    );
};