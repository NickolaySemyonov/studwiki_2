import React from 'react';
import { useArticlesMetaQuery } from '../hooks/sectionQueries';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ArticleMetaListProps {
  sectionId: number;
}

export const ArticleMetaList: React.FC<ArticleMetaListProps> = ({ sectionId }) => {
  const { data: articles, isLoading, error } = useArticlesMetaQuery(sectionId);
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>Ошибка при загрузке статей:</p>
        <p className="font-bold">{(error as Error).message}</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
        <p>В этом разделе еще нет статей.</p>
      </div>
    );
  }

  // Sort articles by lastUpdated (newest first)
  const sortedArticles = [...articles].sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );

  // Format date to be more precise
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
      <div className="space-y-4 pr-2">
        {sortedArticles.map((article) => (
          <div 
            key={article.articleId}
            className={`p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
              article.hidden ? 'bg-gray-200 opacity-75' : 'bg-gray-200'
            }`}
          >
            {!article.hidden || (article.hidden && Number(user?.id) === article.authorId) ?    
              <Link to={`/articles/${article.articleId}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-gray-800">
                     <span className='text-indigo-700 font-bold'>{article.name}</span> 
                      {article.hidden && (
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          Скрыта
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Автор: {article.authorNickname}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Последнее обновление: {formatDate(article.lastUpdated)}
                  </div>
                </div>
              </Link> : 
              <div className='text-gray-800'>Скрыта пользователем {article.authorNickname}</div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleMetaList;