import { useRef, useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import TextEditor from '../components/TextEditor';
import type { TextEditorHandle } from '../components/TextEditor';
import { useCreateArticleMutation } from '../hooks/editorQueries';
import { useAuth } from '../contexts/AuthContext';

import type { INewArticle } from '../services/types';

export const CreateArticlePage: React.FC = () => {
  const{user} = useAuth()
  const editorRef = useRef<TextEditorHandle>(null);
  const {mutate: createArticle, isPending, isError, error,isSuccess, data} = useCreateArticleMutation();

  const [articleName, setArticleName] = useState('');

  const handleSubmit = async () => {
    if (!editorRef.current) return;
        
    const delta = editorRef.current.getDelta();
    if (!delta) return;


    const newArticle:INewArticle = {
      sectionId:1, 
      authorId: Number(user?.id), 
      name:articleName,
      quillDelta: JSON.stringify(delta)
    }

    createArticle(newArticle);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Article Editor</h1>

        <label htmlFor="article-name" className="block text-sm font-medium text-gray-700 mb-1">
          Article Name
        </label>
        <input
          type="text"
          id="article-name"
          value={articleName}
          onChange={(e) => setArticleName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter article name"
          maxLength={100} 
        />
        {articleName.length > 80 && (
          <p className="mt-1 text-sm text-gray-500">
            {100 - articleName.length} characters remaining
          </p>
        )}
      <div className='bg-gray-100 p-4 rounded-lg mb-4 text-black'>
        <TextEditor ref={editorRef} />
      </div>
      
      <div className="flex items-center gap-4">
        <button
          className={`w-xs py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
            isPending ? 'opacity-70' : ''
          }`}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            'Save Article'
          )}
        </button>
        
        {isSuccess && (
          <div className="text-green-600 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {data || 'Article saved successfully!'}
          </div>
        )}
        
        {isError && (
          <div className="text-red-600 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error instanceof Error ? error.message : 'Failed to save article'}
          </div>
        )}
      </div>
    </>
  );
};