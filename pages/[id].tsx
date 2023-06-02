import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import HorizontalLine from "@/components/horizontalLine/HorizontalLine";
import { Chapter } from "@/lib/types/Chapter";
import { Lesson } from "@/lib/types/Lesson";
import { Stats } from "@/lib/types/Stats";
import { secondsToMinutes } from "date-fns";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import ReactPlayer from "react-player/youtube";

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            apiUrl: process.env.API_URL
        },
    };
};

const Chapter = ({ apiUrl }: { apiUrl: string }) => {
    const router = useRouter();
    const { id } = router.query;
    
    const [chapter, setChapter] = useState<Chapter>();
    const [lessons, setLessons] = useState<Array<Lesson>>();
    const [lesson, setLesson] = useState<Lesson>();

    useEffect(() => { // Get chapter data from API
        const getChapterData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/chapters/${id}`, {
                    method: 'GET',
                    mode: 'cors'
                });
            
                const chapterRes = await response.json();
                setChapter(chapterRes);
            } catch (error) {
                console.log(error);
            }
        }

        getChapterData();
    }, []);

    useEffect(() => { // Get lessons data from API
        const getLessonsData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/lessons/chapter=${id}`, {
                    method: 'GET',
                    mode: 'cors'
                });
            
                const lessonsRes = await response.json();
                setLessons(lessonsRes);
            } catch (error) {
                console.log(error);
            }
        }

        getLessonsData();
    }, []);

    useEffect(() => { // Sets first lesson as default
        if (lesson) return;
        setLesson(lessons?.[0]);
    }, [lessons]);

    const LessonsList = () => {
        const LessonButton = (data: Lesson) => {
            const { id, title } = data;

            const style = `${lesson?.id.value === id.value && "text-[var(--sec-txt-color)] font-semibold"} 
            hover:text-[var(--sec-txt-color)] cursor-pointer w-full hover:translate-x-2 transition-all duration-200 }`;

            return (
                <div className="text-lg flex justify-between items-center">
                    <h3 className={style}
                        onClick={() => setLesson(data)}>
                        {title}
                    </h3>
                    <MdOutlineCancel className="text-[var(--sec-txt-color)] mr-2" />
                </div>    
            )
        }
            
        return (
            <div className="w-full scroll flex flex-col gap-2 max-h-[calc(100%-32rem)]
                ">
                {lessons?.map((lesson, index) => (
                    <LessonButton 
                        key={index}
                        id={lesson.id}
                        chapterId={lesson.chapterId}
                        title={lesson.title}
                        description={lesson.description}
                        lessonNumber={lesson.lessonNumber}
                        videoUrl={lesson.videoUrl} /> 
                ))}
            </div>
        )
    }

    const ChapterProgress = () => {
        const Progress = () => (
            <div className="rounded-full border-[22px] my-4 w-60 h-60 grid place-items-center">  
                <p className="text-4xl">0%</p>
            </div>
        )

        const Stats = ({title, completed, total}: Stats) => (
            <div className="w-full flex text-lg items-center justify-between">
                <h3>{title}</h3>
                <p className="font-semibold">{completed} / {total}</p>
            </div>
        )

        return (
            <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center gap-6 sticky top-6 max-h-[calc(100vh-3rem)]">
                <h2 className="text-2xl text-[var(--title-txt-color)] w-full">Napredak</h2>

                <Progress />

                <div className="w-full">
                    <Stats 
                        title="Pređene lekcije" 
                        completed={0} 
                        total={lessons?.length || 0} />
                    <Stats 
                        title="Riješeni zadaci" 
                        completed={0} 
                        total={lessons?.length || 0} />
                </div>

                <HorizontalLine />

                <h2 className="text-2xl text-[var(--title-txt-color)] w-full">Lekcije</h2>
                
                <LessonsList />
            </div>
        )
    }

    const LessonContainer = () => {
        const [duration, setDuration ]  = useState<number>(0);
        
        const BackBtn = () => (
            <Link href="/" className="py-4 px-8 rounded-md shadow-md text-xl flex items-center justify-center gap-2 
            w-fit bg-white text-[var(--title-txt-color)] font-semibold hover:bg-gray-100 transition-all">
                <BsArrowLeft />
                Nazad na poglavlja
            </Link>
        )

        const DurationDisplay = () => duration ? (
            <div className="flex items-center justify-center gap-2">
                <div className="bg-[#f21b3f1a] grid place-items-center p-2 rounded-md shadow-md">
                    <AiOutlineClockCircle className="text-[var(--ter-txt-color)] text-lg" />
                </div>
                <span className="font-semibold">{duration * 2} min</span>
            </div>
        ) : null;

        return (
            <div className="w-full flex flex-col gap-8">
                <BackBtn />

                <div className="w-full bg-white rounded-md shadow-md p-6 flex flex-col gap-8 relative">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl text-[var(--title-txt-color)]">{lesson?.title}</h2>
                        <DurationDisplay />
                    </div>

                    <p className="text-lg">{lesson?.description}</p>


                    <ReactPlayer 
                        url={lesson?.videoUrl} 
                        controls={false} 
                        onDuration={duration => setDuration(secondsToMinutes(duration))}
                        width={"100%"} 
                        height={"500px"} />
                </div>
            </div>
        )
    }

    return ( 
        <>
            <Head>
                <title>{chapter?.title} | nauciProgramiranje.ba</title>
                <meta name="description" content={chapter?.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main>
                <PageDetails
                    title={chapter?.title || ""}
                    description={`${chapter?.description.slice(0, 79)}...` || ""}
                    hasCode={false}
                />

                <Container>
                    <div className="grid grid-cols-[320px_1fr] gap-8 w-full">
                        <ChapterProgress />
                        <LessonContainer />
                    </div>
                </Container>
            </main>
        </>

     );
}
 
export default Chapter;
