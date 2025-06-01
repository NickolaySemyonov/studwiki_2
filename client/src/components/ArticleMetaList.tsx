import React from 'react';
import { useArticlesMetaQuery} from '../hooks/sectionQueries'
import { Link } from 'react-router-dom';


interface ArticleMetaListProps {
  sectionId: number;
}

export const ArticleMetaList: React.FC<ArticleMetaListProps> = ({ sectionId}) => {
  const { data: articles, isLoading, error } = useArticlesMetaQuery(sectionId);

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
        <p>Error loading articles:</p>
        <p className="font-bold">{(error as Error).message}</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
        <p>No articles found in this section.</p>
      </div>
    );
  }

  return (

    
    <div className="space-y-4">
      {articles.map((article) => (
        <div 
          key={article.articleId}
          className={`p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
            article.hidden ? 'bg-gray-200 opacity-75' : 'bg-gray-200'
          }`}
        
        >

          <Link to={`/articles/${article.articleId}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-800">
                {article.articleName}
                {article.hidden && (
                  <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    Hidden
                  </span>
                )}
              </h3>
              <p className="text-gray-600 text-sm">
                By {article.authorNickname}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date(article.lastUpdated).toLocaleDateString()}
            </div>
          </div>
          
          </Link>


          
        </div>
      ))}
    </div>
  );
};

export default ArticleMetaList;