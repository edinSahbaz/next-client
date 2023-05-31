import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";

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
        <Link href={`sadrzaj/${id.value}`}>
            <div className="bg-white shadow-md rounded-md p-6 flex flex-col gap-4">
                <h2 className="text-xl text-[var(--title-txt-color)]">{title}</h2>
                <p>{description}</p>
            </div>
        </Link>
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
                    <ChaptersContainer />
                </Container>
            </main>
        </>
     );
}
 
export default Content;