import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('react-monaco-editor'), {
  ssr: false
});

export default Editor;
