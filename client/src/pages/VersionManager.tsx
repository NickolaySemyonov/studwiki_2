import { useState, useMemo, useCallback, useEffect } from 'react';
import { Delta } from 'quill';
import { VersionList } from "../components/VersionList";
import { ReadonlyTextEditor } from '../components/ReadonlyTextEditor';
import { useArticleQuery, useVersionDataQuery } from '../hooks/articleQueries';

interface VersionMangerProps {
  articleId: number;
}

export const VersionManager = ({ articleId }: VersionMangerProps) => {
  const { data: article, isLoading: isArticleLoading } = useArticleQuery(articleId);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const { data: versionData, isLoading: isVersionLoading } = useVersionDataQuery(selectedVersion || 0);
  const [initialDelta, setInitialDelta] = useState<Delta | null>(null);

  // Set initial delta when article loads
  useEffect(() => {
    if (article && !isArticleLoading) {
      try {
        const delta = new Delta(JSON.parse(article.quillDelta));
        setInitialDelta(delta);
      } catch (error) {
        console.error("Error parsing initial delta:", error);
        setInitialDelta(new Delta());
      }
    }
  }, [article, isArticleLoading]);

  const handleVersionSelect = useCallback((version: { id: number }) => {
    if (selectedVersion !== version.id) {
      setSelectedVersion(version.id);
    }
  }, [selectedVersion]);

  // Implement the working diff algorithm
  const generateDiffDelta = useMemo(() => {
    if (isArticleLoading || isVersionLoading) return initialDelta;
    if (!versionData || !initialDelta) return initialDelta;

    try {
      const oldContent = initialDelta;
      const newContent = new Delta(JSON.parse(versionData.quillDelta));
      
      if (versionData.id === article?.articleId) {
        return oldContent; // Return original if comparing with current
      }

      // Calculate the diff between versions
      const diff = oldContent.diff(newContent);
      
      // Process the diff operations
      const processedDiff = new Delta();
      diff.ops.forEach(op => {
        const processedOp = {...op};
        
        // Handle insertions (new content)
        if ('insert' in processedOp) {
          processedOp.attributes = {
            ...(processedOp.attributes || {}),
            background: "#cce8cc",
            color: "#003700"
          };
        }
        
        // Handle deletions (old content)
        if ('delete' in processedOp) {
          // Convert delete to retain with strike-through
          processedOp.retain = processedOp.delete;
          delete processedOp.delete;
          processedOp.attributes = {
            ...(processedOp.attributes || {}),
            background: "#e8cccc",
            color: "#370000",
            strike: true
          };
        }
        
        processedDiff.push(processedOp);
      });

      // Compose the original content with the processed diff
      return oldContent.compose(processedDiff);
      
    } catch (error) {
      console.error("Error generating diff:", error);
      try {
        return new Delta(JSON.parse(versionData.quillDelta));
      } catch (e) {
        return initialDelta;
      }
    }
  }, [versionData, initialDelta, isArticleLoading, isVersionLoading, article?.articleId]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="md:w-2/3 flex-1 bg-white text-black rounded-lg border p-4">
        <h3 className="text-lg font-medium mb-4">
          {selectedVersion 
            ? isVersionLoading 
              ? 'Loading version...' 
              : `Comparing Version ${selectedVersion} with current` 
            : 'Current Version'}
        </h3>
        
        {generateDiffDelta ? (
          <ReadonlyTextEditor height={'50vh'}
            key={selectedVersion || 'current'}
            value={generateDiffDelta} 
            theme="bubble" 
          />
        ) : (
          <div className="text-gray-500 italic">
            {isVersionLoading || isArticleLoading 
              ? 'Loading content...' 
              : initialDelta 
                ? 'Select a version to compare' 
                : 'No content available'}
          </div>
        )}
      </div>
      <div className="md:w-1/3">
        <VersionList  maxHeight={'50vh'}
          articleId={articleId} 
          onVersionSelect={handleVersionSelect}
          selectedVersionId={selectedVersion || undefined}
        />
      </div>
    </div>
  );
};