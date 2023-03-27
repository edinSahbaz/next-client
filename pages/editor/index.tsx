import dynamic from "next/dynamic";
import Head from "next/head";
const CodeEnviroment = dynamic(() => import('@/components/editor/CodeEnviroment'), { ssr: false })

const Prompt = () => {
    return (
        <div className="">
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

                <div className="grid grid-cols-2 h-full">
                    <Prompt />
                    <CodeEnviroment /> 
                </div>  
            </div> 
        </>
    );
}
 
export default EditorPage;