import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import useResizeObserver from './useResizeObserver';

const ReactMonacoEditor = dynamic(() => import('react-monaco-editor'), {
  ssr: false,
});

const Editor: typeof ReactMonacoEditor = (props) => {
  const [editor, setEditor] = useState<
    monacoEditor.editor.IStandaloneCodeEditor | undefined
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
      <ReactMonacoEditor editorDidMount={setEditor} {...props} />
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
