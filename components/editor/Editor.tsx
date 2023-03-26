import Editor, { DiffEditor, useMonaco, loader, EditorProps } from "@monaco-editor/react";
import { useRef } from "react";

const CodeEditor = () => {
    const editorRef = useRef(null);    

    function handleEditorBeforeMount(monaco) {
        monaco.editor.defineTheme('customTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#1c2736',
            },
        });
    }

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    return ( 
        <Editor
            beforeMount={handleEditorBeforeMount}
            height="50vh"
            defaultLanguage="python"
            theme="customTheme"
            options={{
                fontSize: 14,
                minimap: { enabled: false },
            }}
            className="bg-red-200"
            onMount={handleEditorDidMount}
            />  
     );
}
 
export default CodeEditor;
