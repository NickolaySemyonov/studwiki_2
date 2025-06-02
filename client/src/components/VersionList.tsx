import { useMemo, useState } from 'react';
import { useVersionMetaQuery, useVersionRollbackMutation } from "../hooks/articleQueries";
import type { IVersionMeta } from "../services/types";

interface VersionListProps {
  articleId: number;
  onVersionSelect: (version: IVersionMeta) => void;
  selectedVersionId?: number;
}

type SortMethod = 'date' | 'id';

export const VersionList = ({ 
  articleId, 
  onVersionSelect,
  selectedVersionId 
}: VersionListProps) => {
  const { data: versions, isLoading, isError, error, refetch } = useVersionMetaQuery(articleId);
  const [sortMethod, setSortMethod] = useState<SortMethod>('date');
  const [rollbackInProgress, setRollbackInProgress] = useState<number | null>(null);
  const rollbackMutation = useVersionRollbackMutation();

  const sortedVersions = useMemo(() => {
    if (!versions) return [];
    
    return [...versions].sort((a, b) => {
      if (sortMethod === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.id - a.id;
      }
    });
  }, [versions, sortMethod]);

  const handleRollback = async (versionId: number) => {
    setRollbackInProgress(versionId);
    try {
      await rollbackMutation.mutateAsync(versionId);
      await refetch(); // Refresh the version list
    } catch (err) {
      console.error('Rollback failed:', err);
      // You might want to show a toast notification here
    } finally {
      setRollbackInProgress(null);
    }
  };
  const toggleSortMethod = () => {
    setSortMethod(prev => prev === 'date' ? 'id' : 'date');
  };

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Loading versions...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading versions: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!sortedVersions?.length) {
    return <div className="p-4 text-center text-gray-500">No versions available</div>;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
        <h3 className="font-medium text-black">Article Versions</h3>
        <button 
          onClick={toggleSortMethod}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          Sort by: {sortMethod === 'date' ? 'Date' : 'ID'}
        </button>
      </div>
      
      <ul className="divide-y">
        {sortedVersions.map((version) => (
          <li 
            key={version.id} 
            className={`p-3 group ${version.active ? "bg-gray-800" : "bg-white"} ${
              version.id === selectedVersionId ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => onVersionSelect(version)}
              >
                <div className="flex items-center">
                  <span className={`font-medium ${
                    version.active ? "text-white" : "text-black"
                  }`}>
                    Version {version.id}
                  </span>
                  {version.active && (
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      Current
                    </span>
                  )}
                </div>
                <div className={`text-sm ${
                  version.active ? "text-gray-300" : "text-gray-500"
                }`}>
                  {new Date(version.date).toLocaleString()}
                </div>
              </div>
              
              {!version.active && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Restore version ${version.id} from ${new Date(version.date).toLocaleDateString()}?`)) {
                      handleRollback(version.id);
                    }
                  }}
                  disabled={rollbackInProgress === version.id}
                  className={`ml-2 px-3 py-1 text-xs rounded-md ${
                    rollbackInProgress === version.id 
                      ? "bg-gray-300 text-gray-600" 
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                >
                  {rollbackInProgress === version.id ? 'Restoring...' : 'Restore'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};