import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Delta } from 'quill';

interface ReadonlyTextEditorProps {
  value?: string | Delta;
  placeholder?: string;
  theme?: 'snow' | 'bubble';
  height?: string | number; // Add height prop
}

export interface ReadonlyTextEditorHandle {
  getDelta: () => Delta | undefined;
  getHTML: () => string | undefined;
}

export const ReadonlyTextEditor = forwardRef<ReadonlyTextEditorHandle, ReadonlyTextEditorProps>(
  ({ value = '', placeholder = '', theme = 'snow', height = 'auto' }, ref) => {
    const quillRef = useRef<ReactQuill>(null);

    // Initialize or update the editor content
    useEffect(() => {
      if (!quillRef.current) return;

      const editor = quillRef.current.getEditor();
      
      if (value instanceof Delta) {
        editor.setContents(value);
      } else if (typeof value === 'string') {
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

    // Styles for the editor container
    const editorStyles = {
      height: typeof height === 'number' ? `${height}px` : height,
      overflowY: 'auto' as const,
    };

    return (
      <div style={editorStyles}>
        <ReactQuill
          ref={quillRef}
          theme={theme}
          readOnly={true}
          modules={modules}
          placeholder={placeholder}
          value={''} // Start with empty value
        />
      </div>
    );
  }
);