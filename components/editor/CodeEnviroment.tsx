import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";
import { ReactNode, useEffect, useRef } from "react";
import { usePython } from "react-py";
import { BarLoader, MoonLoader } from "react-spinners";
import Header from "./Header";

interface ConsoleProps {
    stdout: string;
    stderr: string;
    isLoading: boolean;
    isRunning: boolean;
}

const Console = (props: ConsoleProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);    
    const { stdout, stderr, isLoading, isRunning } = props;

    useEffect(() => {
        if(!bottomRef.current) return;

        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    return (
        <div className="bg-[var(--editor-bg)] relative rounded-md h-[30%] shadow-md">
            <Header tabs={["Output"]} />
            <pre className="max-h-[calc(100%-2.5rem)] h-[calc(100%-2.5rem)] overflow-y-auto py-2 px-4">
                {
                    isRunning && <div className="w-[50%] absolute top-3 grid place-items-center bg-[#1c2736] p-2 rounded-md left-[25%]">
                        <BarLoader color="#f21b3f" width={"100%"} speedMultiplier={0.75} />
                    </div> 
                }
                <code>{stdout}</code>
                <code>{stderr}</code>
                <div ref={bottomRef} />
            </pre>
        </div>
    );
}

const CodeEnviroment = () => {
    const editorRef = useRef<any>(null);
    
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

    const handleEditorBeforeMount: BeforeMount = (monaco) => {
        monaco.editor.defineTheme('customTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#1c2736',
            },
        });
    }

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor; 
    }

    const runCode = () => {
        if(isLoading) return;
        if(!editorRef.current) return;

        const code: string = editorRef.current.getValue();
        runPython(String(code));
    }

    return !isLoading ? ( 
        <div className="text-white flex flex-col gap-4 h-full max-h-screen">
            <div className="h-[70%] rounded-md shadow-md">
                <Header tabs={["Input"]} btn={{
                    content: "Pokreni kod",
                    bg: "bg-[#00852a]",
                    bg_hover: "hover:bg-[#006c21]",
                    action: runCode,
                }} />
                <div className="h-[calc(100%-2.5rem)]">
                    <Editor
                        onMount={handleEditorDidMount}
                        beforeMount={handleEditorBeforeMount}
                        defaultLanguage="python"
                        theme="customTheme"
                        loading={<MoonLoader color="#f21b3f" size={50} speedMultiplier={0.75} />}
                        options={{
                            fontSize: 16,
                            minimap: { enabled: false },
                        }}
                    /> 
                </div>
            </div>

            <Console stdout={stdout} stderr={stderr} isLoading={isLoading} isRunning={isRunning} />
        </div>
     ) : (
        <div className="flex justify-center items-center h-full">
            <MoonLoader color="#f21b3f" size={75} speedMultiplier={0.75} />
        </div>
     );
}

export default CodeEnviroment;
