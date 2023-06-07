import Container from "@/components/general/Container";
import Forbidden from "@/components/general/Forbidden";
import RedButton from "@/components/general/RedButton";
import PageDetails from "@/components/header/PageDetails";
import HorizontalLine from "@/components/horizontalLine/HorizontalLine";
import { getChapterById } from "@/lib/chapters/chapters";
import UserContext from "@/lib/context/UserContext";
import { getLessons } from "@/lib/lessons/lessons";
import { Chapter } from "@/lib/types/Chapter";
import { Lesson } from "@/lib/types/Lesson";
import { Stats } from "@/lib/types/Stats";
import { secondsToMinutes } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight, BsCheckLg } from "react-icons/bs";
import { MdChecklistRtl, MdOutlineCancel } from "react-icons/md";
import ReactPlayer from "react-player/youtube";
import { MoonLoader } from "react-spinners";

const Chapter = () => {
    const router = useRouter();
    const { id, selectedLesson } = router.query;

    const { user } = useContext(UserContext);
    
    const [chapter, setChapter] = useState<Chapter>();
    const [lessons, setLessons] = useState<Array<Lesson>>();

    const [lesson, setLesson] = useState<Lesson>();
    const [prevLesson, setPrevLesson] = useState<Lesson>();
    const [nextLesson, setNextLesson] = useState<Lesson>();

    useEffect(() => { // Get chapter and lessons data from API
        if (!id) return;

        getChapterById(id as string, setChapter);
        getLessons(id as string, setLessons);
    }, [id]);

    useEffect(() => { // Sets first lesson as default
        if (selectedLesson) return;
        if (!lessons) return;

        setLesson(lessons?.[0]);
    }, [lessons]);

    useEffect(() => { // Sets previous and next lesson based on current lesson
        if (!lesson) return;

        const compare = (l: Lesson, position: "prev" | "next") => {
            if (lesson == undefined) return false;
            if (lesson.lessonNumber == undefined) return false;

            return l.lessonNumber === lesson.lessonNumber + (position === "prev" ? -1 : 1);
        }   

        const prevLesson = lessons?.find(l => compare(l, "prev"));
        const nextLesson = lessons?.find(l => compare(l, "next"));

        setPrevLesson(prevLesson);
        setNextLesson(nextLesson);
    }, [lesson])

    useEffect(() => { // Sets selectedLesson based on selectedLesson query param
        if (!selectedLesson) return;
        if (!lessons) return;

        const lesson = lessons.find(l => l.id.value === selectedLesson);
        setLesson(lesson);
    }, [selectedLesson, lessons])

    const LessonsList = () => {
        const LessonButton = (data: Lesson) => {
            const { id, title, lessonNumber } = data;

            const style = `${lesson?.id.value === id.value && "text-[var(--sec-txt-color)] font-semibold"} 
            hover:text-[var(--sec-txt-color)] cursor-pointer w-full hover:translate-x-2 transition-all duration-200 }`;

            return (
                <div className="text-md flex justify-between items-center">
                    <h3 className={style}
                        onClick={() => setLesson(data)}>
                        {lessonNumber} - {title}
                    </h3>
                    <MdOutlineCancel className="text-[var(--sec-txt-color)] mr-2" />
                </div>    
            )
        }
            
        return (
            <div className="w-full scroll flex flex-col gap-2 max-h-[calc(100%-32rem)]">
                {lessons?.map((lesson, index) => (
                    <LessonButton 
                        key={index}
                        id={lesson.id}
                        chapterId={lesson.chapterId}
                        title={lesson.title}
                        description={lesson.description}
                        lessonNumber={lesson.lessonNumber}
                        videoUrl={lesson.videoUrl}
                        questionsNumber={lesson.questionsNumber} /> 
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
                        total={lessons?.map(l => l.questionsNumber || 0).reduce((a, b) => a + b) || 0} />
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
            <Link href="/kurs" className="py-4 px-8 rounded-md shadow-md text-xl flex items-center justify-center gap-3 
            w-fit bg-white text-[var(--title-txt-color)] font-semibold hover:bg-gray-100 transition-all">
                <BsArrowLeft />
                Nazad na poglavlja
            </Link>
        )

        const SwitchLessonBtn = ({ lesson, orientation }: { lesson: Lesson, orientation: "left" | "right" }) => {
            if(!lesson) return null;
            const { title, lessonNumber } = lesson;

            return (
                <button 
                className={`py-4 px-8 rounded-md shadow-md flex items-center ${orientation === "right" && "flex-row-reverse"} 
                justify-center gap-4 w-fit bg-white text-[var(--title-txt-color)] font-semibold hover:bg-gray-100 transition-all`}
                onClick={() => setLesson(lesson)}>
                    <BsArrowLeft className={`${orientation === "right" && "rotate-180"}`} />
                    <div className={`${orientation === "left" ? "text-left" : "text-right"}`}>
                        <p className="font-light text-sm">Lekcija {lessonNumber}</p>
                        <h3 className="-mt-1">{title}</h3>
                    </div>
                </button>
            )
        }

        const DurationDisplay = () => duration ? (
            <div className="flex items-center justify-center gap-2">
                <div className="bg-[#f21b3f1a] grid place-items-center p-2 rounded-md shadow-md">
                    <AiOutlineClockCircle className="text-[var(--ter-txt-color)] text-lg" />
                </div>
                <span className="font-semibold">{duration * 2} min</span>
            </div>
        ) : null;

        const Questions = () => lesson?.questionsNumber ? (
            <div className="flex flex-col gap-2">
                <div className="text-xl text-[var(--title-txt-color)] flex items-center gap-2">
                    <MdChecklistRtl className="text-3xl" />
                    <h3 className="">Zadaci lekcije {lesson?.lessonNumber}</h3>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 w-full">
                        <div className="bg-gray-100 h-2 rounded-md w-full"></div> 
                        <span className="font-semibold">{"0%"}</span>
                    </div>

                    <RedButton 
                        btnText="Zadaci"
                        btnAction={`/zadaci/${lesson?.id.value}`}
                        btnIcon={<BsArrowRight />}
                        reversed={true}
                        animated={false} />
                </div>
            </div>
        ) : (
            <div className="">
                Ova lekcija nema zadataka.
            </div>
        );

        const MarkAsWatched = () => {
            const Checkbox = () => (
                <div className="w-7 h-7 bg-[#f21b3f1a] rounded-sm shadow-sm grid place-items-center">
                    <BsCheckLg className="text-[var(--ter-txt-color)] text-xl" />
                </div>
            )

            return (
                <label className="mt-2 flex items-center gap-2 cursor-pointer">
                    Označi kao odgledano
                    <Checkbox />
                </label>
            )
        }

        return (
            <div className="w-full flex flex-col gap-8">
                <BackBtn />

                <div className="w-full bg-white rounded-md shadow-md p-6 flex flex-col gap-8 relative">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl text-[var(--title-txt-color)]">{lesson?.title}</h2>
                        <DurationDisplay />
                    </div>

                    <p className="text-lg">{lesson?.description}</p>

                    <div className="flex flex-col items-end">
                        <ReactPlayer 
                            url={lesson?.videoUrl} 
                            controls={false} 
                            onDuration={duration => setDuration(secondsToMinutes(duration))}
                            width={"100%"} 
                            height={"500px"} />

                        <MarkAsWatched />
                    </div>

                    <HorizontalLine />

                    <Questions />
                </div>

                <div className="flex items-center justify-between">
                    { prevLesson ? <SwitchLessonBtn lesson={prevLesson} orientation="left" /> : <div></div>}
                    { nextLesson ? <SwitchLessonBtn lesson={nextLesson} orientation="right" /> : <div></div>}
                </div>
            </div>
        )
    }

    return user?.isCoursePaid ? ( 
        <>
            <Head>
                <title>{chapter?.title} | nauciProgramiranje.ba</title>
                <meta name="description" content={chapter?.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title={`${chapter?.chapterNumber} - ${chapter?.title}`}
                    description={`${chapter?.description.slice(0, 79)}...` || ""}
                    hasCode={false}
                />

                <Container>
                    <div className="grid grid-cols-[320px_1fr] gap-8 w-full">
                        {
                            lessons ? (
                                <>
                                    <ChapterProgress />
                                    <LessonContainer />
                                </>
                            ) : (
                                <div className="w-full h-[320px] grid place-items-center col-span-2">
                                    <MoonLoader color="#f21b3f" size={80} speedMultiplier={0.75} />
                                </div>
                            )
                        }
                    </div>
                </Container>
            </main>
        </>
     ) : (
        <Forbidden />
     );
}
 
export default Chapter;
