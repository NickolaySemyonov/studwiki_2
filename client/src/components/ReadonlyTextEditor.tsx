import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Delta } from 'quill';

interface ReadonlyTextEditorProps {
  value?: string | Delta;
  placeholder?: string;
  theme?: 'snow' | 'bubble';
}

export interface ReadonlyTextEditorHandle {
  getDelta: () => Delta | undefined;
  getHTML: () => string | undefined;
}

export const ReadonlyTextEditor = forwardRef<ReadonlyTextEditorHandle, ReadonlyTextEditorProps>(
  ({ value = '', placeholder = '', theme = 'snow' }, ref) => {
    const quillRef = useRef<ReactQuill>(null);

    // Initialize or update the editor content
    useEffect(() => {
      if (!quillRef.current) return;

      const editor = quillRef.current.getEditor();
      
      if (value instanceof Delta) {
        // For Delta objects
        editor.setContents(value);
      } else if (typeof value === 'string') {
        // For HTML strings
        editor.clipboard.dangerouslyPasteHTML(value);
      }
    }, [value]);

    useImperativeHandle(ref, () => ({
      getDelta: () => quillRef.current?.getEditor().getContents(),
      getHTML: () => quillRef.current?.getEditor().root.innerHTML,
    }));

    const modules = {
      toolbar: null,
      clipboard: {
        matchVisual: false
      }
    };

    return (
      <ReactQuill
        ref={quillRef}
        theme={theme}
        readOnly={true}
        modules={modules}
        placeholder={placeholder}
        value={''} // Start with empty value, we'll set content via useEffect
      />
    );
  }
);

