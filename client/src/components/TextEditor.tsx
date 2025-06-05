import React, { forwardRef, useImperativeHandle } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Delta } from 'quill';

interface TextEditorProps {
  value?: string | Delta;
  onChange?: (content: string, delta: Delta, source: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: string | number;
}

export interface TextEditorHandle {
  getEditor: () => ReactQuill | null;
  getDelta: () => Delta | undefined;
  getHTML: () => string | undefined;
}

const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  ({ value = '', onChange, placeholder = 'Write something...', readOnly = false, height = '300px' }, ref) => {
    const [editorReadOnly, setEditorReadOnly] = React.useState(readOnly);
    const [editorValue, setEditorValue] = React.useState(value);
    const quillRef = React.useRef<ReactQuill>(null);

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

    const handleChange = (content: string, delta: Delta, source: string) => {
      setEditorValue(content);
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: typeof height === 'number' ? `${height}px` : height,
        // border: '1px solid #ccc',
        // borderRadius: '4px',
      }}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={editorValue}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          readOnly={editorReadOnly}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
            border:'none'
          }}
          bounds={'.quill-container'}
        />
      </div>
    );
  }
);

export default TextEditor;