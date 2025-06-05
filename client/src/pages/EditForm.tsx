import { useRef, useState } from "react";
import type { TextEditorHandle } from "../components/TextEditor";
import type { IArticle, IArticleEdit } from "../services/types";
import { Delta } from "quill";
import TextEditor from "../components/TextEditor";
import { useAuth } from "../contexts/AuthContext";
import { useEditArticleMutation } from "../hooks/editorQueries";

export const EditForm: React.FC<IArticle> = (article) => {
    const { user } = useAuth();
    const editorRef = useRef<TextEditorHandle>(null);
    const [articleName, setArticleName] = useState(article.name);
    const [commenting, setCommenting] = useState(article.commenting);
    const [hidden, setHidden] = useState(article.hidden);
    
    // Store initial delta in ref to prevent recreation on re-renders
    const initialDelta = useRef(new Delta(JSON.parse(article.quillDelta))).current;

    const { 
        mutate: editArticle, 
        isPending, 
        isError, 
        error, 
        isSuccess, 
        data 
    } = useEditArticleMutation(article.articleId);

    const handleSubmit = async () => {
        if (!editorRef.current) return;
        const delta = editorRef.current.getDelta();
        if (!delta) return;
       
        editArticle({
            sectionId: article.sectionId,
            lastEditorId: Number(user?.id),
            name: articleName,
            quillDelta: JSON.stringify(delta),
            articleId: article.articleId,
            commenting,
            hidden
        });
    };

    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <div className="form-group">
                <label htmlFor="articleName" className="block mb-1 font-medium">
                    Article Title
                </label>
                <input
                    type="text"
                    id="articleName"
                    value={articleName}
                    onChange={(e) => setArticleName(e.target.value)}
                    className="w-full p-2 border rounded bg-gray-200 text-black"
                    required
                    disabled={isPending}
                />
            </div>

            <div className="form-group bg-gray-200 text-black">
                <label className="block mb-1 font-medium">Content</label>
                <TextEditor   height={'50vh'}
                    ref={editorRef} 
                    value={initialDelta} 
                    placeholder="Write your article content..."
                    readOnly={isPending}
                />
            </div>

            <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={commenting}
                        onChange={(e) => setCommenting(e.target.checked)}
                        className="h-4 w-4"
                        disabled={isPending}
                    />
                    <span>Allow Comments</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={hidden}
                        onChange={(e) => setHidden(e.target.checked)}
                        className="h-4 w-4"
                        disabled={isPending}
                    />
                    <span>Hide Article</span>
                </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 items-center">
                {/* Success Message */}
                {isSuccess && (
                    <div className="flex items-center text-green-600 mr-4">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {/* {data?.message || "Changes saved successfully!"} */}
                    </div>
                )}

                {/* Error Message */}
                {isError && (
                    <div className="flex items-center text-red-600 mr-4">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error instanceof Error ? error.message : "Failed to save changes"}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
                        isPending 
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isPending ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </span>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>

            {/* Additional success actions */}
            {isSuccess && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
                    <p>Your changes have been successfully saved.</p>
                    <div className="mt-2 flex space-x-3">
                        <button className="text-green-700 hover:text-green-900 underline">
                            View Article
                        </button>
                        <button className="text-green-700 hover:text-green-900 underline">
                            Continue Editing
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};