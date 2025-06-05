import React from 'react';
import { useArticleQuery } from '../hooks/articleQueries';
import { ReadonlyTextEditor } from '../components/ReadonlyTextEditor';
import { Delta } from 'quill';
import { CustomLink } from '../components/ui/CustomLink';
import { CustomNavLink } from '../components/ui/CustomNavLink';
import { BackIcon } from '../components/ui/Icons';


interface ArticleViewerProps{
    articleId:number
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({articleId}) => {

  // Fetch article data
  const { data: article, isLoading, isError } = useArticleQuery(articleId);

  // Convert the quillDelta string to a Delta object
  const deltaContent = React.useMemo(() => {
    if (!article?.quillDelta) return undefined;
    try {
      return new Delta(JSON.parse(article.quillDelta));
    } catch (e) {
      console.error('Error parsing quillDelta', e);
      return undefined;
    }
  }, [article?.quillDelta]);

  if (isLoading) return <div>Загрузка статьи...</div>;
  if (isError) return <div>Ошибка при загрузке статьи</div>;
  if (!article) return <div>Статья не найдена</div>;

    return (
    <>
      <div className="article-container max-w-6xl mx-auto space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <CustomNavLink to={`/sections/${article.sectionId}`}>
            <BackIcon /> Назад
          </CustomNavLink>
          <h1 className="text-2xl font-bold text-indigo-600">
            {article.name}
          </h1>
        </div>

        <div className="article-content bg-white text-gray-800 rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
          <ReadonlyTextEditor
            height={'60vh'}
            value={deltaContent}
            theme="snow" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="article-meta text-sm text-gray-500">
            <span className='mr-3'>Автор: <span className="font-medium text-indigo-600">{article.authorNickname}</span></span>
            <span className=''>Последнее изменение: <span className="font-medium text-indigo-600">{new Date(article.lastUpdated).toLocaleDateString()}</span></span>
            <span> от пользователя <span className="font-medium text-indigo-600">{article.lastEditorNickname}</span></span>
          </div>
          <div className='flex gap-3'>
            <CustomLink
              to={`/version_mgr/${articleId}`}>
              Управление версиями
            </CustomLink>
            <CustomLink
              to={`/editor/${articleId}`}
            >
              Редактировать
            </CustomLink>
          </div>
        </div>
      </div>
    </>
  );
};