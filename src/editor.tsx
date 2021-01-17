import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import { monaco } from 'react-monaco-editor';
import useResizeObserver from './useResizeObserver';

const ReactMonacoEditor = dynamic(() => import('react-monaco-editor'), {
  ssr: false,
});

const Editor: typeof ReactMonacoEditor = (props) => {
  const [editor, setEditor] = useState<
    monaco.editor.IStandaloneCodeEditor | undefined
  >();
  const containerRef = useRef<HTMLElement>();

  const resizeHandler = useCallback(
    (width, height) => editor?.layout({ width, height }),
    [editor]
  );

  useResizeObserver(resizeHandler, containerRef);

  return (
    <div
      className="wrapper"
      ref={(element) => (containerRef.current = element!)}
    >
      <ReactMonacoEditor
        language="js"
        editorDidMount={(editor) => {
          setEditor(editor);
        }}
        {...props}
      />
      <style jsx>{`
        .wrapper {
          flex: 1;
          background-color: #1e1e1e;
        }
      `}</style>
    </div>
  );
};

export default Editor;
