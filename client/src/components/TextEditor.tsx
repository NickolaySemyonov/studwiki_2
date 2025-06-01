import React, { forwardRef, useImperativeHandle } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Delta } from 'quill';

interface TextEditorProps {
  value?: string | Delta;
  onChange?: (content: string, delta: Delta, source: string) => void;
  placeholder?: string;
  readOnly?:boolean;
}

export interface TextEditorHandle {
  getEditor: () => ReactQuill | null;
  getDelta: () => Delta | undefined;
  getHTML: () => string | undefined;
}

const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  ({ value = '', onChange, placeholder = 'Write something...', readOnly = false }, ref) => {
    const [editorReadOnly, setEditorReadOnly] = React.useState(readOnly);
    const [editorValue, setEditorValue] = React.useState(value);
    const quillRef = React.useRef<ReactQuill>(null);

    // Expose editor methods via ref
    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef.current,
      getDelta: () => quillRef.current?.getEditor().getContents(),
      getHTML: () => quillRef.current?.getEditor().root.innerHTML,
    }));

    React.useEffect(() => {
      setEditorValue(value);
    }, [value]);
    React.useEffect(() => {
      setEditorReadOnly(readOnly);
    }, [readOnly]);

    const handleChange = (content: string, delta: Delta, source: string, editor: ReactQuill.UnprivilegedEditor) => {
      setEditorValue(content);
      
      // Call onChange with all relevant information
      if (onChange) {
        const quill = quillRef.current?.getEditor();
        const fullDelta = quill?.getContents();
        onChange(content, fullDelta || delta, source);
      }
    };

    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    };

    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'link',
      'image',
    ];

    return (
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={editorReadOnly}
      />
    );
  }
);

export default TextEditor;