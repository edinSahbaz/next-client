import Editor, { DiffEditor, useMonaco, loader, EditorProps } from "@monaco-editor/react";
import { jsPython } from "jspython-interpreter";
import { useRef, useState } from "react";

const CodeEditor = () => {
    const [code, setCode] = useState<string | undefined>('');   
    const [output, setOutput] = useState<string | undefined>('');   

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

    const runCode = () => {
        jsPython()
        .evaluate(code ? code : "")
        .then(
            result => console.log(result),
            error => console.log(error)
        );
    }

    return ( 
        <>
            <button onClick={runCode} className="bg-white p-2" >RUN CODE</button>
            
            <Editor
                beforeMount={handleEditorBeforeMount}
                height="50vh"
                defaultLanguage="python"
                theme="customTheme"
                value={code}
                onChange={(value) => setCode(value)}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                }}
                className="bg-red-200"
            />  
        </>
     );
}
 
export default CodeEditor;
