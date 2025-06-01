import React from 'react';
import { useArticleQuery } from '../hooks/articleQueries';
import { ReadonlyTextEditor } from '../components/ReadonlyTextEditor';
import { Delta } from 'quill';


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

  if (isLoading) return <div>Loading article...</div>;
  if (isError) return <div>Error loading article</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="article-container">
      <h1>{article.articleName}</h1>
      <div className="article-meta">
        <span>By {article.authorNickname}</span>
        <span>Last updated: {new Date(article.lastUpdated).toLocaleDateString()}</span>
        {article.lastEditorNickname && (
          <span>Last edited by: {article.lastEditorNickname}</span>
        )}
      </div>

      <div className="article-content bg-gray-200">
        <ReadonlyTextEditor
          value={deltaContent}
          theme="snow"
        />
      </div>

      {article.commenting && (
        <div className="comments-section">
          {/* Your comments component would go here */}
        </div>
      )}
    </div>
  );
};

