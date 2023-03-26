import CodeEditor from "@/components/editor/Editor";
import Head from "next/head";

const Prompt = () => {
    return (
        <div>
            
        </div>                       
    );
}

const Code = () => {
    return (
        <div>
            <CodeEditor />
        </div>                           
    );
}
const EditorPage = () => {
    return ( 
        <>
            <Head>
                <title>Editor | nauciProgramiranje.ba</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-[var(--bg-color)] w-full h-screen">

                <div className="grid grid-cols-2">
                    <Prompt />
                    <Code /> 
                </div>  
            </div> 
        </>
    );
}
 
export default EditorPage;