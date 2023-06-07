import Container from '@/components/general/Container';
import RedButton from '@/components/general/RedButton';
import PageDetails from '@/components/header/PageDetails'
import { BtnType } from '@/lib/types/BtnType';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { AiOutlineDatabase } from 'react-icons/ai';
import { BiBook, BiCodeBlock, BiDesktop, BiMovie } from 'react-icons/bi';
import { BsPersonCheck } from 'react-icons/bs';
import { FaCreditCard } from 'react-icons/fa';
import { MdChecklistRtl } from 'react-icons/md';
import { TbCertificate } from 'react-icons/tb';
import { HiXMark, HiCheck } from 'react-icons/hi2';

export default function Home() {
    const Intro = () => {
        interface IntroElementProps {
            title: string;
            description: string;
            link: string;
            icon: ReactNode;
        }

        const IntroElement = ({title, description, link, icon}: IntroElementProps) => (
            <div className='flex flex-col items-center gap-2 hover:cursor-pointer hover:shadow-xl border-[1px] border-transparent 
            hover:border-gray-100 w-[calc(33.3%-1rem)] p-6 transition-all duration-300 text-center'>
                {icon}
    
                <h3 className='text-[var(--title-txt-color)] text-xl'>{title}</h3>
                <p className='text-[var(--p-txt-color)] text-[15px]'>{description}</p>
                
                <Link href={link} scroll={false} className='hover-underline-animation hover-underline-animation-red text-[var(--sec-txt-color)]'>
                    Pogledaj više.
                </Link>
            </div>
        )

        const iconStyle = "text-[3rem] text-[var(--sec-txt-color)]";
      
        const cards: IntroElementProps[] = [
            {
                title: 'Pogodnosti platforme',
                description: 'Učenje programiranja je nesumnjivo zastrašujuće. nauciProgramiranje.ba vam pruža najjednostavniju, najmoderniju platformu, sa svime što vam je potrebno da naučite programiranje lako i bez stresa.',
                link: '#platforma',
                icon: <BiDesktop className={iconStyle}/>
            },
            {
                title: 'Sadržajan kurikulum',
                description: 'Ispravno, pravo učenje programiranja zahtijeva detaljno planiran i kreiran kurikulum fokusiran na sve bitne elemente programiranja, što je upravo ono čime se nauciProgramiranje.ba može pohvaliti.',
                link: '#kurikulum',
                icon: <BiBook className={iconStyle}/>
            },
            {
                title: 'Dizajnirano od strane stručnjaka',
                description: 'Programiranje možete učiti iz mnogih resursa i izvora ili možete učiti iz kurikuluma koji su sastavili i kreirali stručnjaci, programeri, sa dugogodišnjim iskustvom u IT industriji i podučavanju progamiranja.',
                link: '#kurikulum',
                icon: <BsPersonCheck className={iconStyle}/>
            },
            {
                title: 'Instrukcije visokog kvaliteta',
                description: 'Učenje programiranja mnogo je lakše i mnogo ugodnije kada imate pristup videima i meet-ovima visoke kvalitete gdje je objašnjen svaki detalj potreban da shvatite neki koncpet.',
                link: '#kurikulum',
                icon: <BiMovie className={iconStyle}/>
            },
            {
                title: 'Pitanja za provjeru',
                description: 'Praksa čini savršenim, posebno kada se uči programirati. Većina naših lekcija sadrži pitanja za vježbu kako biste učvrstili vaše razumijevanje svake teme. To su stotine pitanja koja će vas učiniti profesionalcem.',
                link: '#pitanja',
                icon: <MdChecklistRtl className={iconStyle}/>
            },
            {
                title: 'Velika baza zadataka',
                description: 'Super je znati programirati. Još je zgodnije znati kako napraviti sjajne projekte uz programiranje. Naših 5 praktičnih projekata programiranja će vas provesti kroz to i približiti pravom svijetu programiranja.',
                link: '#projekti',
                icon: <AiOutlineDatabase className={iconStyle}/>
            },
            {
                title: 'Vrhunsko radno okruženje',
                description: 'U svojoj srži, programiranje je primijenjena vještina. Zato sve naše lekcije dolaze sa radnim okruženjem za programiranje bogatim funkcijama gdje možete pisati i izvršavati kod, otklanjati greške i čuvati kod.',
                link: '#editor',
                icon: <BiCodeBlock className={iconStyle}/>
            },
            {
                title: 'Certifikat',
                description: 'Ako ste uspješno uradili sve zadatke i pitanja sa platforme, onda vi definitivno znate programirati! Iz tog razloga zaslužujete certifikat koji potvrđuje vaše stečeno znanje iz programiranja.',
                link: '#certifikat',
                icon: <TbCertificate className={iconStyle}/>
            },
        ]

        return (
            <div>
                <h2 className='text-4xl text-[var(--title-txt-color)] text-center my-10'>
                    Šta je nauciProgramiranje.ba?
                </h2>

                <div className='flex flex-wrap gap-6 items-center justify-center'>
                    {
                        cards.map((card, index) => (
                            <IntroElement
                                key={index}
                                title={card.title}
                                description={card.description}
                                link={card.link}
                                icon={card.icon}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }

    const Platform = () => {
        const Table = () => {
            const Th = ({ children }: { children?: React.ReactNode }) => (
                <th className="px-4 py-10 border-b-[1px] w-1/5 h-20 relative text-lg">
                    {children}
                </th>
            );

            const Td = ({ children }: { children?: React.ReactNode }) => (
                <td className="p-4 border-b-[1px] w-1/5 h-20 font-semibold">
                    {children}
                </td>
            );

            const XmarkTd = () => (
                <Td>
                    <div className='w-full h-full grid place-items-center'>
                        <div className='bg-red-100 w-3/4 py-2 grid place-items-center rounded-md'>
                            <HiXMark className='text-2xl text-red-600' />
                        </div>
                    </div>
                </Td>
            )

            const CheckmarkTd = () => (
                <Td>
                    <div className='w-full h-full grid place-items-center'>
                        <div className='bg-green-100 w-3/4 py-2 grid place-items-center rounded-md'>
                            <HiCheck className='text-2xl text-green-600' />
                        </div>
                    </div>
                </Td>
            )

            return (
                <table className='bg-white rounded-md w-full'>
                    <thead>
                        <tr>
                            <Th></Th>
                            <Th>YouTube</Th>
                            <Th>Coding Bootcamps</Th>
                            <Th>Ostale online platforme</Th>
                            <Th>
                                <div className='bg-[var(--sec-txt-color)] absolute top-0 right-0 w-full h-full flex 
                                flex-col items-center justify-center rounded-tr-md'>
                                    <Image 
                                        src={"/logo-white.svg"} 
                                        alt='logo' 
                                        width={36} 
                                        height={36} />
                                    <p className='text-white'>nauciProgramiranje.ba</p>
                                </div>
                            </Th>
                        </tr>
                    </thead>

                    <tbody>
                       <tr>
                            <Td>Pristupačno</Td>

                            <CheckmarkTd></CheckmarkTd>
                            <XmarkTd></XmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                       </tr>

                       <tr>
                            <Td>Mali ulog vremena</Td>

                            <CheckmarkTd></CheckmarkTd>
                            <XmarkTd></XmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                       </tr>

                       <tr>
                            <Td>Guided format podučavanja</Td>

                            <XmarkTd></XmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                       </tr>

                       <tr>
                            <Td>Premium okruženje za pisanje koda</Td>

                            <XmarkTd></XmarkTd>
                            <XmarkTd></XmarkTd>
                            <XmarkTd></XmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                       </tr>

                       <tr>
                            <Td>Instrukcije visokog kvaliteta</Td>

                            <XmarkTd></XmarkTd>
                            <XmarkTd></XmarkTd>
                            <XmarkTd></XmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                       </tr>

                       <tr>
                            <Td>Ekstremna jednostavnost</Td>

                            <XmarkTd></XmarkTd>
                            <XmarkTd></XmarkTd>
                            <XmarkTd></XmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                       </tr>

                       <tr>
                            <Td>Najbolja cjelokupna vrijednost</Td>

                            <XmarkTd></XmarkTd>
                            <XmarkTd></XmarkTd>
                            <XmarkTd></XmarkTd>
                            <CheckmarkTd></CheckmarkTd>
                       </tr>
                    </tbody>
                </table>
            )
        }

        return (
            <div id='platforma' className='py-12 flex flex-col gap-4 items-center w-full'>
                <h2 className='text-3xl text-[var(--title-txt-color)]'>Najbolja platforma za učenje programiranja</h2>
                <p className=''>Jednostavno. Pristupačno. Kvalitetno. Sve na jednom mjestu.</p>
                <p className=''>To je nauciProgramiranje.ba.</p>

                <Table />
            </div>
        )
    }
    interface WrapperProps {
        id: string;
        title: string;
        description: string;
        btnProps: BtnType;
        textPosition: 'left' | 'right';
        background: 'dark' | 'light';
        graphic: React.ReactNode
    }

    const Wrapper = ({ id, title, description, btnProps, textPosition, background, graphic }: WrapperProps) => {
        const bg = background === 'dark' ? 'bg-[var(--bg-color)]' : 'bg-[var(--body-bg-color)]';
        const txtColor = background === 'dark' ? 'text-white' : 'text-[var(--p-txt-color)]';
        const style = `px-[15%] py-24 w-full grid grid-cols-2 items-center gap-12 ${txtColor} ${bg}`;

        return (
            <div id={id} className={style}>
                <div className={`${textPosition === 'right' && 'order-last'} flex flex-col gap-10`}>
                    <h2 className={`text-3xl ${background === 'light' && 'text-[var(--title-txt-color)]'}`}>{title}</h2>
                    <p>{description}</p>

                    <RedButton 
                        btnAction={btnProps.btnAction} 
                        btnText={btnProps.btnText} 
                        btnIcon={btnProps.btnIcon}
                        animated={true}  />
                </div>

                <div className='grid place-items-center'>
                    {graphic}
                </div>
            </div>
        );
    }

    const Curiculum = () => {
        const PythonImg = () => (
            <Image 
                alt='python'
                src='/python.png'
                width={520}
                height={200}
            />
        );

        return (
            <Wrapper 
                id='kurikulum'
                title='Obiman i sadržajan kurikulum'
                description='Planski smišljen kurikulum za svaki kurs pokriva sve što treba motivisanom i vrijednom programeru da postane performantan softverski inžinjer, od osnova programiranja i objektno-orijentisanog programiranja, do naprednih programskih koncepata i metoda kao i alata za razvoj softvera.'
                btnProps={{
                    btnAction: '/',
                    btnText: 'Istražite sadržaj',
                    btnIcon: <BiBook />
                }}
                background='dark'
                textPosition='right'
                graphic={PythonImg()}
            />
        );
    }

    const Tasks = () => {
        const numbersOfTasks = [1, 2, 5, 12, 18, 21, 26, 39];

        const Task = ({ taskNumber }: { taskNumber: number }) => (
            <div className='bg-white pl-4 w-[280px] rounded-md shadow-md flex items-center 
            justify-between animate__animated animate__fadeIn hover:scale-110 transition-all'>
                <h3 className='font-semibold text-sm text-[var(--sec-txt-color)]'>
                    Zadatak {taskNumber}
                </h3>
                <div className='bg-[var(--sec-txt-color)] w-10 h-10 rounded-r-md relative'>
                    <div className='bg-[var(--ter-txt-color)] w-2 h-10 rounded-r-md absolute right-0 top-0'>
                    </div>
                </div>
            </div>
        )

        const TaskCards = () => (
            <div className='flex flex-col gap-3'>
                {numbersOfTasks.map((taskNumber, index) => (
                    <Task key={index} taskNumber={taskNumber} />
                ))}
            </div>
        )

        return (
            <Wrapper
                id='pitanja'
                title='Veliki broj zadataka za vježbu'
                description='Kao što vrijedi za svaku vještinu, što više vježbate pisanje koda, postat ćete bolji. Tačno iz tog razloga nauciProgramiranje.ba nudi veliki broj zadataka za vježbu da bi ste kristalizovali svoje novostečena znanja iz programiranja.
                Da vam ne bi bilo dosadno(što je nemoguće - programiranje je zabavno!), naši zadaci su pažljivo smišljeni i dolaze u više formata.'
                btnProps={{
                    btnAction: '/kurs',
                    btnText: 'Pogledajte kurs',
                    btnIcon: <MdChecklistRtl />
                }}
                background='light'
                textPosition='left'
                graphic={<TaskCards />}
            />
        );
    }

    const Projects = () => {
        const projects = ['Caesar Cipher and Hacker', 'Hangman and Guillotine', 'Rock, Paper, Scissors', 'Number System Converter', 'Blackjack Card Game'];

        const Project = ({ projectName }: { projectName: string }) => (
            <div className='bg-[var(--bg-sec-editor)] w-[420px] py-4 border-gray-500 
            border-[2px] rounded-md shadow-md'>
                <h3 className='text-center font-semibold'>{projectName}</h3>
            </div>
        )

        const ProjectsCards = () => (
            <div className='flex flex-col gap-4'>
                {projects.map((projectName, index) => (
                    <Project key={index} projectName={projectName} />
                ))}
            </div>
        )
        
        return (
            <Wrapper
                id='projekti'        
                title='Praktični programski zadaci'
                description='Svaki novi programer se eventualno zapita: "Okej, mogu čitati i pisati kod, i mogu rješavati male probleme kodom, ali da li mogu razviti real-world aplikacije?"
                Na sreću Vas, budućeg programera, sa nauciProgramiranje.ba ne morate se to više pitati. Naši praktični projekti služe kao savršena tranzicija sa pisanja početničkog koda, ondosno skripti, na pravljenje naprednog softvera i aplikacija.'
                btnProps={{
                    btnAction: '/kurs',
                    btnText: 'Pogledajte kurs',
                    btnIcon: <MdChecklistRtl />
                }}
                background='dark'
                textPosition='right'
                graphic={<ProjectsCards />}
            />
        );
    }

    const Editor = () => {
        const EditorImg = () => (
            <Image 
                alt='python'
                src='/editor.png'
                width={620}
                height={200}
                className='editorImg'
            />
        );

        return (
            <Wrapper 
                id='editor'
                title='Bogato programsko radno okruženje'
                description='Mi vjerujemo da učenje i vježbanje pisanja koda treba biti što jednostavnije i pristupačnije. Sve treba biti pojednostavljeno da biste se mogli fokusirati na ono najbitnije: pisanje koda.
                Dizajnirano sa jednostavnošću kao prioritetom, naše radno okruženje vam omogućava da primijenite svoje novostečene programerske vještine upravo na nauciProgramiranje.ba web stranici. Trenutno postoje radna okruženja za kurseve osnova web razvoja i programiranja, dok napredne kurseve podučavamo u postojećim alatima, smatrajući da je to najbolji način da vas pripremimo za buduću karijeru.'
                btnProps={{
                    btnAction: '/zadaci/94e50028-a554-47e6-aa33-f192cd5880eb',
                    btnText: 'Pogledajte radno okruženje',
                    btnIcon: <BiCodeBlock />
                }}            
                background='light'
                textPosition='left'
                graphic={EditorImg()}
            />
        );
    }

    const Certificate = () => {
        return (
            <div id='certifikat' className='bg-[var(--bg-color)] px-[15%] py-24 flex items-center justify-center flex-col gap-4 text-white'>
                <h2 className='text-3xl'>Certifikat o završenom kursu</h2>
                <p>Kada završite sve lekcija i sva pitanja na nauciProgramiranje.ba platformi, dobijate certifikat.</p>

                <Image 
                    alt='certifikat'
                    src='/certificate.png'
                    width={800}
                    height={240}
                    className='shadow-2xl border-[1px] border-gray-600 my-8'
                />

                <RedButton
                    btnAction='/kurs'
                    btnText='Pogledajte kurs'
                    btnIcon={<MdChecklistRtl />}
                />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>nauciProgramiranje.ba | Postani softverski inžinjer!</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                title='nauciProgramiranje.ba'
                description='Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer.'
                hasCode={true}
                btn={{
                    btnText: 'Upiši se na kurs',
                    btnIcon: <FaCreditCard />,
                    btnAction: '/kupovina'
                }}
                />

                <Container>
                    <Intro />
                    <Platform />
                </Container>

                <Curiculum />
                <Tasks />
                <Projects />
                <Editor />
                <Certificate />
            </main>
        </>
    )
}
