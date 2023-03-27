import Editor from "@monaco-editor/react";
import { ReactNode, useRef } from "react";
import { usePython } from "react-py";

interface ConsoleProps {
    stdout: string;
    stderr: string;
    isLoading: boolean;
    isRunning: boolean;
}

interface HeaderProps {
    tabs: string[];
    btn: {
        content: ReactNode | string,
        bg: string,
        bg_hover: string,
    } | null;
}

const Tab = (props: { tab: string, first: boolean, last: boolean }) => {
    const { tab, first, last } = props;
    
    return (
        <div className={`bg-[var(--editor-bg)] w-fit px-6 h-full grid place-items-center ${first && "rounded-tl-md"} ${last && "rounded-tr-md"}`}>
            <p>{tab}</p>
        </div>
    );
}

const Header = (props: HeaderProps) => {
    const { tabs, btn } = props;

    return (
        <div className="bg-[var(--bg-sec-editor)] w-full h-10 flex justify-between shadow-md rounded-t-md">
            <div className="h-full">
            { tabs.map((tab, index) => (
                    <Tab key={index} tab={tab} first={index === 0} last={index === tabs.length - 1} />
            ))}
            </div>

            {
                btn && (
                    <div className={`${btn.bg} ${btn.bg_hover} transition-all duration-300 cursor-pointer px-6 grid place-items-center rounded-tr-md`}>
                        {btn.content}
                    </div>
                )
            }
        </div>
    );
}

const Console = (props: ConsoleProps) => {
    const { stdout, stderr, isLoading, isRunning } = props;

    return (
        <div className="bg-[var(--editor-bg)] rounded-md h-[30%] shadow-md">
            <Header tabs={["Output"]} btn={null} />
            <pre className="max-h-[calc(100%-2.5rem)] overflow-y-auto py-2 px-4">
                <code>{stdout}</code>
                <code>{stderr}</code>
            </pre>
            {isLoading && <p>Loading...</p>}
            {isRunning && <p>Running...</p>}
        </div>
    );
}

const CodeEnviroment = () => {
    const editorRef = useRef(null);
    
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

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

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor; 
    }

    const runCode = () => {
        if(isLoading) return;
        if(!editorRef.current) return;

        const code = editorRef.current.getValue();
        runPython(String(code));
    }

    return ( 
        <div className="text-white flex flex-col gap-4 h-full max-h-screen p-4">
            <div className="h-[70%] rounded-md shadow-md">
                {/* <button onClick={runCode}>Run</button> */}
                <Header tabs={["Input"]} btn={{
                    content: "Submit",
                    bg: "bg-[#00852a]",
                    bg_hover: "hover:bg-[#006c21]",
                }} />
                <div className="h-[calc(100%-2.5rem)]">
                    <Editor
                        onMount={handleEditorDidMount}
                        beforeMount={handleEditorBeforeMount}
                        defaultLanguage="python"
                        theme="customTheme"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                        }}
                    /> 
                </div>
            </div>

            <Console stdout={stdout} stderr={stderr} isLoading={isLoading} isRunning={isRunning} />
        </div>
     );
}

export default CodeEnviroment;
