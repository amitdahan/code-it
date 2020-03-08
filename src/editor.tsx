import dynamic from 'next/dynamic';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

const ReactMonacoEditor = dynamic(() => import('react-monaco-editor'), {
  ssr: false
});

const useResizeObserver = (
  cb: (width: number, height: number) => void,
  ref: MutableRefObject<HTMLElement | undefined>
) => {
  const observer = useMemo(
    () =>
      process.browser
        ? new ResizeObserver(([entry]) => {
            cb(entry.contentRect.width, entry.contentRect.height);
          })
        : undefined,
    [cb]
  );

  useEffect(() => {
    if (observer) {
      observer?.observe(ref?.current!);
      return () => observer?.disconnect();
    }
  }, [observer, cb, ref]);
};

const Editor: typeof ReactMonacoEditor = props => {
  const [editor, setEditor] = useState<
    monacoEditor.editor.IStandaloneCodeEditor | undefined
  >();
  const containerRef = useRef<HTMLElement>();

  const resizeHandler = useCallback(
    (width, height) => {
      console.log('resized!', width, height);
      editor?.layout({ width, height });
    },
    [editor]
  );

  useResizeObserver(resizeHandler, containerRef);

  return (
    <div
      className="wrapper"
      ref={element => {
        if (element) {
          containerRef.current = element;
        }
      }}
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
