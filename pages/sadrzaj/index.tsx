import ActionButton from "@/components/general/ActionButton";
import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";

const Content = () => {
    interface Chapter {
        id: { value: string };
        title: string;
        description: string;
        chapterNumber: number;
    }

    const [chapters, setChapters] = useState<Array<Chapter>>();

    useEffect(() => { // Get course chapters data
        async function getCourseData() {
            try {
                const response = await fetch('https://localhost:7051/api/chapters', {
                    method: 'GET',
                    mode: 'cors'
                });

                if(!response.ok) throw new Error(`Error! status: ${response.status}`);

                const result = await response.json();
                setChapters(result);
            } catch (err) {
                console.log(err); 
            }
        }
        
        getCourseData();
    }, []);

    const ChapterInfo = ({id, title, description, chapterNumber}: Chapter) => (
        // <Link href={`sadrzaj/${id.value}`}>
            <div className="bg-white shadow-md rounded-md p-6 flex flex-col gap-4 h-64">
                <h2 className="text-xl text-[var(--title-txt-color)]">{title}</h2>
                <p>{description}</p>
            </div>
        // </Link>
    )
    
    const ChaptersContainer = () => (
        <div className="flex flex-col gap-6">
            {
                chapters?.map((chapter, index) => (
                    <ChapterInfo 
                        key={index} 
                        id = {chapter.id}
                        title={chapter.title} 
                        description={chapter.description}
                        chapterNumber={chapter.chapterNumber} />
                ))
            }
        </div>
    )

    const CourseProgress = () => {
        const Progress = () => (
            <div className="rounded-full border-[14px] w-36 h-36 grid place-items-center">  
                <p className="text-2xl">0%</p>
            </div>
        )

        interface StatsProps {
            title: string;
            completed: number;
            total: number;
        }

        const Stats = ({title, completed, total}: StatsProps) => (
            <div className="text-center">
                <h3>{title}</h3>
                <p className="font-semibold">{completed} / {total}</p>
            </div>
        )

        return (
            <div className="bg-white rounded-md shadow-md p-6 pt-28 h-fit flex flex-col items-center gap-6 sticky top-8 mt-6">
                <div className="bg-[var(--ter-bg-color)] w-3/4 grid place-items-center h-28 absolute -top-6 shadow-md rounded-md">
                    <TbCertificate className="text-white text-6xl" />
                </div>

                <h2 className="text-xl text-[var(--title-txt-color)]">Certifikat</h2>

                <Progress />

                <Stats title="Riješena pitanja" completed={0} total={156} />
                <Stats title="Riješeni zadaci" completed={0} total={20} />

                <p className="text-sm mb-8 font-light text-center italic">Otključajte nauciProgramiranje.ba certifikat kada uspješno završite sve zadatke na platformi.</p>
 
                <div className="w-3/4 absolute -bottom-4">
                    <ActionButton 
                        text="Otključaj certifikat"
                        action={() => {}} 
                        disabled={true} />
                </div>
            </div>
        )
    }

    return ( 
        <>
            <Head>
                <title>Sadržaj | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title='Ultimativna platforma'
                    description='Sve što treba da naučite programirati na jednom mjestu. Stvarno.'
                    hasCode={false}
                    btn={{
                        btnText: 'Upiši se na kurs',
                        btnIcon: <FaCreditCard />,
                        btnAction: '/kupovina'
                    }}
                />

                <Container>
                    <div className="grid grid-cols-[260px_1fr] gap-6">
                        <CourseProgress />
                        <ChaptersContainer />
                    </div>
                </Container>
            </main>
        </>
     );
}
 
export default Content;