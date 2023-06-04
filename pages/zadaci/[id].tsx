import Header from "@/components/editor/Header";
import Logo from "@/components/header/Logo";
import { Lesson } from "@/lib/types/Lesson";
import { Question } from "@/lib/types/Question";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdChecklistRtl } from "react-icons/md";
const CodeEnviroment = dynamic(() => import('@/components/editor/CodeEnviroment'), { ssr: false })

const SolvedStatus = ({ isCompleted }: { isCompleted: boolean }) => (
    <div className={`w-4 h-4 rounded-full shadow-md ${isCompleted ? "bg-green-600" : "bg-red-600"} border-[1px] border-gray-700`}></div>
)

const Prompt = ({ selectedQuestion }: { selectedQuestion?: Question }) => {
    const [answers, setAnswers] = useState<Array<string>>([]);

    useEffect(() => { // Sets possible answers based on the selected question
        if (!selectedQuestion) return;

        const possibleAnswers = selectedQuestion?.possibleAnswers.split(',');
        setAnswers(possibleAnswers);
    }, [selectedQuestion])

    const PromptTab = () => (
        <div className="w-full">
            <h2 className="flex items-center gap-2 text-2xl">
                Pitanje {selectedQuestion?.questionNumber}
                <SolvedStatus isCompleted={false} />
            </h2>
            
            <pre className="text-white whitespace-pre-wrap mt-6">
                <span className="text-lg font-sans">
                    {selectedQuestion?.prompt}
                </span>
            </pre>
        </div>
    )

    const Answer = ({ answer }: { answer: string }) => (
        <div className="px-4 rounded-md shadow-md py-2 bg-[var(--bg-sec-editor)] w-fit text-xl">
            {answer}
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

    return (
        <div className="text-white flex flex-col gap-4 h-full max-h-screen w-full">
            <div className="h-full rounded-md shadow-md bg-[var(--editor-bg)]">
                <Header tabs={["Prompt"]} />
                
                <div className="w-full p-4">
                    <PromptTab />
                    {!selectedQuestion?.isCodeQuestion && <PossibleAnswers />}
                </div>
            </div>
        </div>                       
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            apiUrl: process.env.API_URL
        },
    };
};

const QuestionsPage = ({ apiUrl }: { apiUrl: string }) => {
    const router = useRouter();
    const { id } = router.query;

    const [lesson, setLesson] = useState<Lesson>();
    const [questions, setQuestions] = useState<Array<Question>>();
    const [selectedQuestion, setSelectedQuestion] = useState<Question>();

    useEffect(() => { // Gets lesson data based on the lesson id
        if (!id) return;
        if (!apiUrl) return;

        const getLessonData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/lessons/${id}`, {
                    method: 'GET',
                    mode: 'cors'
                });
            
                const lessonRes = await response.json();
                setLesson(lessonRes);
            } catch (error) {
                console.log(error);
            }
        }

        getLessonData();
    }, [id]);

    useEffect(() => { // Gets the questions based on the lesson id
        if (!id) return;
        if (!apiUrl) return;

        const getLessonQuestions = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/questions/lesson=${id}`, {
                    method: 'GET',
                    mode: 'cors'
                });
            
                const questionsRes = await response.json();
                console.log(questionsRes);
                setQuestions(questionsRes);
            } catch (error) {
                console.log(error);
            }
        }

        getLessonQuestions();
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
            href={`/${lesson?.chapterId?.value}?selectedLesson=${lesson?.id.value}`}>
                <MdChecklistRtl className="text-2xl" />
                {lesson?.title}
            </Link>
        </div>
    )

    return ( 
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
                    <CodeEnviroment /> 
                </div>
            </div> 
        </>
    );
}
 
export default QuestionsPage;