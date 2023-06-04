import Header from "@/components/editor/Header";
import { Lesson } from "@/lib/types/Lesson";
import { Question } from "@/lib/types/Question";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const CodeEnviroment = dynamic(() => import('@/components/editor/CodeEnviroment'), { ssr: false })

const Prompt = ({ questions }: { questions: Array<Question> }) => {
    const QuestionsTabs = () => (
        <div>
        </div>
    )

    const tabs = questions.map(question => question.questionNumber);
    
    return (
        <div className="text-white flex flex-col gap-4 h-full max-h-screen w-full">
            <div className="h-full rounded-md shadow-md bg-[var(--editor-bg)]">
                <Header tabs={tabs} />
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

    return ( 
        <>
            <Head>
                <title>Zadaci - Lekcija {lesson?.lessonNumber} | nauciProgramiranje.ba</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-[var(--bg-color)] w-full h-screen grid grid-cols-2 gap-4 p-4">
                <Prompt questions={questions || []} />
                <CodeEnviroment /> 
            </div> 
        </>
    );
}
 
export default QuestionsPage;