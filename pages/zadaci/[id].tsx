import Header from "@/components/editor/Header";
import ActionButton from "@/components/general/ActionButton";
import Forbidden from "@/components/general/Forbidden";
import Logo from "@/components/header/Logo";
import UserContext from "@/lib/context/UserContext";
import { getLessonById } from "@/lib/lessons/lessons";
import { getQuestions } from "@/lib/questions/questions";
import { Lesson } from "@/lib/types/Lesson";
import { Question } from "@/lib/types/Question";
import Editor, { BeforeMount } from "@monaco-editor/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { MdChecklistRtl } from "react-icons/md";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
const CodeEnviroment = dynamic(() => import('@/components/editor/CodeEnviroment'), { ssr: false })

const SolvedStatus = ({ isCompleted }: { isCompleted: boolean }) => (
    <div className={`w-4 h-4 rounded-full shadow-md ${isCompleted ? "bg-green-600" : "bg-red-600"} border-[1px] border-gray-700`}></div>
)

const Prompt = ({ selectedQuestion }: { selectedQuestion?: Question }) => {
    const [answers, setAnswers] = useState<Array<string>>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string>();
    const [activeTab, setActiveTab] = useState<string>('Zadatak');

    useEffect(() => { // Sets possible answers based on the selected question
        if (!selectedQuestion) return;

        setSelectedAnswer(undefined);
        setActiveTab('Zadatak');

        const possibleAnswers = selectedQuestion?.possibleAnswers.split(',').map(answer => answer.trim());
        setAnswers(possibleAnswers);
    }, [selectedQuestion])

    const PromptTab = () => (
        <div className="w-full p-4">
            <h2 className="flex items-center gap-2 text-2xl">
                Pitanje {selectedQuestion?.questionNumber}
                <SolvedStatus isCompleted={false} />
            </h2>
            
            <pre className="text-white whitespace-pre-wrap mt-6">
                <span className="font-sans">
                    {selectedQuestion?.prompt}
                </span>
            </pre>

            {!selectedQuestion?.isCodeQuestion && <PossibleAnswers />}
        </div>
    )

    const Selected = ({ isSelected }: { isSelected: boolean }) => (
        <div className={`w-4 h-4 border-2 rounded-full ${isSelected && "bg-gray-100"}`}>
            <div className="w-full h-full rounded-full border-2 border-[var(--bg-sec-editor)]"></div>
        </div>
    )

    const Answer = ({ answer }: { answer: string }) => (
        <div className="px-4 rounded-md shadow-md py-2 bg-[var(--bg-sec-editor)] w-fit flex items-center gap-2
            cursor-pointer font-light" onClick={() => setSelectedAnswer(answer)}>
            <Selected isSelected={answer === selectedAnswer} /> {answer}
        </div>
    )

    const PossibleAnswers = () => {
        return (
            <div className="mt-4 flex flex-col gap-4">
                {
                    answers?.map((answer, index) => (
                        <Answer key={index} answer={answer} />
                    ))
                }
            </div>
        )
    }

    const SolutionTab = () => {
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

        return (
            <div className="w-full h-full">
                <Editor
                    beforeMount={handleEditorBeforeMount}
                    defaultLanguage="python"
                    defaultValue={selectedQuestion?.answer}
                    theme="customTheme"
                    loading={<MoonLoader color="#f21b3f" size={50} speedMultiplier={0.75} />}
                    options={{
                        fontSize: 16,
                        minimap: { enabled: false },
                    }}
                /> 
            </div>
        )
    }

    const checkAnswer = () => {
        if (!selectedAnswer) return;

        if (selectedAnswer === selectedQuestion?.answer) toast.success("Odgovor je tačan!");
        else toast.error("Odgovor nije tačan!");
    }

    const btn = {
        content: "Provjeri",
        bg: "bg-[#00852a]",
        bg_hover: "hover:bg-[#006c21]",
        action: checkAnswer,
    }

    const tabs = selectedQuestion?.isCodeQuestion ? ["Zadatak", "Rješenje"] : ["Zadatak"];

    return (
        <div className="text-white flex flex-col gap-4 h-full max-h-screen w-full">
            <div className="h-full rounded-md shadow-md bg-[var(--editor-bg)]">
                <Header 
                    tabs={ tabs } 
                    setActiveTab={setActiveTab}
                    btn={ selectedQuestion?.isCodeQuestion ? undefined : btn } />
                
                <div className="w-full h-[calc(100%-2.5rem)]">
                    { activeTab === "Zadatak" && <PromptTab /> }
                    { activeTab === "Rješenje" && <SolutionTab /> }
                </div>
            </div>
        </div>                       
    );
}

const QuestionsPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { user } = useContext(UserContext);

    const [lesson, setLesson] = useState<Lesson>();
    const [questions, setQuestions] = useState<Array<Question>>();
    const [selectedQuestion, setSelectedQuestion] = useState<Question>();

    useEffect(() => { // Gets lesson data and questions based on the lesson id
        if (!id) return;

        getLessonById(id as string, setLesson);
        getQuestions(id as string, setQuestions);
    }, [id]);

    useEffect(() => {
        if (!questions) return;
        if (selectedQuestion) return;

        setSelectedQuestion(questions[0]);
    }, [questions])

    const QuestionsPicker = () => {
        const QuestionBtn = ({ questionNumber }: { questionNumber: number }) => (
            <div className={`w-16 h-10 rounded-md shadow-md flex items-center justify-center gap-2 
                font-bold cursor-pointer hover:bg-[var(--sec-txt-color)] text-white text-lg 
                ${questionNumber === selectedQuestion?.questionNumber ? "bg-[var(--editor-bg)]" : "bg-[var(--bg-sec-editor)]"}`}
                onClick={() => setSelectedQuestion(questions?.find(q => q.questionNumber === questionNumber))}>
                {questionNumber}
                <SolvedStatus isCompleted={false} />
            </div>
        )

        return (
            <div className="flex gap-4">
                {questions?.map((question, index) => (
                    <QuestionBtn key={index} questionNumber={question.questionNumber} />
                ))}
            </div>
        )
    }

    const MainHeader = () => (
        <div className="flex gap-4">
            <div className="h-full bg-[var(--sec-txt-color)] rounded-b-md shadow-md">
                <Logo simple={true} theme="light" size="small" />
            </div>

            <Link className="h-full bg-[var(--bg-sec-editor)] rounded-b-md shadow-md text-white font-semibold px-8 
            hover:bg-[var(--sec-txt-color)] cursor-pointer flex items-center justify-center gap-2"
            href={`/kurs/${lesson?.chapterId?.value}?selectedLesson=${lesson?.id.value}`}>
                <MdChecklistRtl className="text-2xl" />
                {lesson?.title}
            </Link>
        </div>
    )

    const LockedEditor = () => {
        const [locked, setLocked] = useState<boolean>(true);

        return (
            <div className="text-white flex flex-col gap-4 h-full max-h-screen w-full">
                <div className="h-full rounded-md shadow-md bg-[var(--editor-bg)]">
                    <Header tabs={["Rješenje"]} />

                    {
                        locked ? (
                            <div className="w-full h-[calc(100%-2.5rem)] grid place-items-center">
                                <div className="w-full h-8 bg-[#141c25] grid place-items-center">
                                    <div className="w-32 h-32 bg-[#141c25] -mt-12 rounded-full grid place-items-center">
                                        <AiFillLock className="text-7xl text-[var(--editor-bg)]" />
                                    </div>

                                    <div className="w-[220px] mt-4">
                                        <ActionButton text="Otkrij rješenje" action={() => setLocked(false)} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-[calc(100%-2.5rem)] flex items-center justify-center gap-2">
                                <BiCheck className="text-4xl text-green-500" />
                                <h3 className="text-xl">
                                    Tačan odgovor je: 
                                    <span className="font-bold pl-1">{selectedQuestion?.answer}</span>
                                </h3>
                            </div>
                        )
                    }
                </div>
            </div>  
        )
    }

    return user?.isCoursePaid ? ( 
        <>
            <Head>
                <title>Zadaci - Lekcija {lesson?.lessonNumber} | nauciProgramiranje.ba</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-[var(--bg-color)] w-full h-screen grid grid-rows-[3rem_2.5rem_1fr] gap-4 p-4 pt-0">
                <MainHeader />
                <QuestionsPicker />
                <div className="w-full grid grid-cols-2 gap-4">
                    <Prompt selectedQuestion={selectedQuestion} />
                    {
                        selectedQuestion?.isCodeQuestion ? (
                            <CodeEnviroment /> 
                        ) : (
                            <LockedEditor />
                        )
                    }
                </div>
            </div> 
        </>
    ) : (
        <Forbidden />
    )
}
 
export default QuestionsPage;