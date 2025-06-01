import { useSectionsQuery } from "../hooks/sectionQueries";
import type { ISectionMeta } from "../services/types";
import { CustomLink } from "./ui/CustomLink";

export const SectionList: React.FC = () => {
  const { data: sections, isLoading, isError, error } = useSectionsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> {error?.message || 'Failed to load sections'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Sections</h2>
      
      {sections?.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section: ISectionMeta) => (
            <li 
              key={section.sectionId}
              className="bg-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{section.name}</h3>
              
              {/* <button 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => {
                  // Navigate to section details or articles in this section
                  console.log(`View section ${section.sectionId}`);
                }}
              >
                View Articles →
              </button> */}

              <CustomLink 
                to={`/sections/${section.sectionId}`}
              > 
              View Articles 
              </CustomLink>


              
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No sections found
        </div>
      )}
   
    </div>    
  );
};

