import { useState } from 'react';
import { VersionList } from "../components/VersionList";
import { ReadonlyTextEditor } from '../components/ReadonlyTextEditor';
import { useVersionDataQuery } from '../hooks/articleQueries';
import { Delta } from 'quill';

export const VersionManager = ({ articleId }: { articleId: number }) => {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const { data: versionData } = useVersionDataQuery(selectedVersion || 0);

  const handleVersionSelect = (version: { id: number }) => {
    setSelectedVersion(version.id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="md:w-1/3">
        <VersionList 
          articleId={articleId} 
          onVersionSelect={handleVersionSelect}
          selectedVersionId={selectedVersion || undefined}
        />
      </div>
      
      <div className="md:w-2/3 flex-1 bg-white rounded-lg border p-4">
        <h3 className="text-lg font-medium mb-4">
          {selectedVersion ? `Previewing Version ${selectedVersion}` : 'Select a version to preview'}
        </h3>
        
        {versionData ? (
          <ReadonlyTextEditor 
            value={new Delta(JSON.parse(versionData.quillDelta)) } 
            theme="snow" 
          />
        ) : (
          <div className="text-gray-500 italic">
            {selectedVersion ? 'Loading version content...' : 'No version selected'}
          </div>
        )}
      </div>
    </div>
  );
};