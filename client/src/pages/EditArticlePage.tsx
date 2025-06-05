import { MainLayout } from './layouts/MainLayout';
import { useArticleQuery } from '../hooks/articleQueries';
import { EditForm } from './EditForm';
import { CustomLink } from '../components/ui/CustomLink';
import { CustomNavLink } from '../components/ui/CustomNavLink';
import { BackIcon } from '../components/ui/Icons';

interface ArticleEditorProps{
    articleId:number
}

export const EditArticlePage: React.FC<ArticleEditorProps>= ({articleId}) => {
    
    const { data: article, isLoading, isError } = useArticleQuery(articleId);
    

    if (isLoading) return <div>Статья загружается...</div>;
    if (isError) return <div>При загрузке статьи возникла ошибка</div>;
    if (!article) return <MainLayout><div>Статья не найдена</div></MainLayout>;

    return (
        <>  
            
            
            <EditForm {...article}/>
           
        </>
    );
};