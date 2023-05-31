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
                
                <Link href={link} className='hover-underline-animation hover-underline-animation-red text-[var(--sec-txt-color)]'>
                    Pogledaj više.
                </Link>
            </div>
        )

        const iconStyle = "text-[3rem] text-[var(--sec-txt-color)]";
      
        const cards: IntroElementProps[] = [
            {
                title: 'Pogodnosti platforme',
                description: 'Učenje programiranja je nesumnjivo zastrašujuće. nauciProgramiranje.ba vam pruža najjednostavniju, najmoderniju platformu, sa svime što vam je potrebno da naučite programiranje lako i bez stresa.',
                link: '',
                icon: <BiDesktop className={iconStyle}/>
            },
            {
                title: 'Sadržajan kurikulum',
                description: 'Ispravno, pravo učenje programiranja zahtijeva detaljno planiran i kreiran kurikulum fokusiran na sve bitne elemente programiranja, što je upravo ono čime se nauciProgramiranje.ba može pohvaliti.',
                link: '',
                icon: <BiBook className={iconStyle}/>
            },
            {
                title: 'Dizajnirano od strane stručnjaka',
                description: 'Programiranje možete učiti iz mnogih resursa i izvora ili možete učiti iz kurikuluma koji su sastavili i kreirali stručnjaci, programeri, sa dugogodišnjim iskustvom u IT industriji i podučavanju progamiranja.',
                link: '',
                icon: <BsPersonCheck className={iconStyle}/>
            },
            {
                title: 'Instrukcije visokog kvaliteta',
                description: 'Učenje programiranja mnogo je lakše i mnogo ugodnije kada imate pristup videima i meet-ovima visoke kvalitete gdje je objašnjen svaki detalj potreban da shvatite neki koncpet.',
                link: '',
                icon: <BiMovie className={iconStyle}/>
            },
            {
                title: 'Pitanja za provjeru',
                description: 'Praksa čini savršenim, posebno kada se uči programirati. Većina naših lekcija sadrži pitanja za vježbu kako biste učvrstili vaše razumijevanje svake teme. To su stotine pitanja koja će vas učiniti profesionalcem.',
                link: '',
                icon: <MdChecklistRtl className={iconStyle}/>
            },
            {
                title: 'Velika baza zadataka',
                description: 'Super je znati programirati. Još je zgodnije znati kako napraviti sjajne projekte uz programiranje. Naših 5 praktičnih projekata programiranja će vas provesti kroz to i približiti pravom svijetu programiranja.',
                link: '',
                icon: <AiOutlineDatabase className={iconStyle}/>
            },
            {
                title: 'Vrhunsko radno okruženje',
                description: 'U svojoj srži, programiranje je primijenjena vještina. Zato sve naše lekcije dolaze sa radnim okruženjem za programiranje bogatim funkcijama gdje možete pisati i izvršavati kod, otklanjati greške i čuvati kod.',
                link: '',
                icon: <BiCodeBlock className={iconStyle}/>
            },
            {
                title: 'Certifikat',
                description: 'Ako ste uspješno uradili sve zadatke i pitanja sa platforme, onda vi definitivno znate programirati! Iz tog razloga zaslužujete certifikat koji potvrđuje vaše stečeno znanje iz programiranja.',
                link: '',
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
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Opis</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>HTML</td>
                            <td>HTML je jezik za označavanje sadržaja. Koristi se za definisanje strukture i sadržaja web stranice.</td>
                        </tr>
                        <tr>
                            <td>CSS</td>
                            <td>CSS je jezik za stilizovanje web stranica. Koristi se za definisanje izgleda i dizajna web stranica.</td>
                        </tr>
                        <tr>
                            <td>JavaScript</td>
                            <td>JavaScript je programski jezik koji se koristi za kreiranje interaktivnih elemenata na web stranicama.</td>
                        </tr>
                        <tr>
                            <td>React</td>
                            <td>React je JavaScript biblioteka za kreiranje korisničkih interfejsa. Koristi se za kreiranje web i mobilnih aplikacija.</td>
                        </tr>
                        <tr>
                            <td>Node.js</td>
                            <td>Node.js je JavaScript okruženje za izvršavanje koda na strani servera. Koristi se za kreiranje web servera i API-ja.</td>
                        </tr>
                        <tr>
                            <td>Express.js</td>
                            <td>Express.js je Node.js framework za kreiranje web servera i API-ja. Koristi se za kreiranje web servera i API-ja.</td>
                        </tr>
                        <tr>
                            <td>Git</td>
                            <td>Git je sistem za upravljanje verzijama koda. Koristi se za praćenje promjena u kodu i saradnju na projektima.</td>
                        </tr>
                        <tr>
                            <td>GitHub</td>
                            <td>GitHub je platforma za hostovanje koda. Koristi se za hostovanje i dijeljenje koda sa drugim programerima.</td>
                        </tr>
                        <tr>
                            <td>VS Code</td>
                            <td>VS Code je besplatan tekst editor. Koristi se za pisanje i uređivanje koda.</td>
                        </tr>
                    </tbody>
                </table>
            )
        }


        return (
            <div>
                <h2 className=''>Najbolja platforma za učenje programiranja</h2>
                <p className=''>Jednostavno. Pristupačno. Kvalitetno. Sve na jednom mjestu.</p>

                <Table />
            </div>
        )
    }

    interface WrapperProps {
        title: string;
        description: string;
        btnProps: BtnType;
        textPosition: 'left' | 'right';
        background: 'dark' | 'light';
        graphic: React.ReactNode
    }

    const Wrapper = ({title, description, btnProps, textPosition, background, graphic}: WrapperProps) => {
        const bg = background === 'dark' ? 'bg-[var(--bg-color)]' : 'bg-[var(--body-bg-color)]';
        const txtColor = background === 'dark' ? 'text-white' : 'text-[var(--p-txt-color)]';
        const style = `px-[15%] py-24 w-full grid grid-cols-2 gap-12 ${txtColor} ${bg}`;

        return (
            <div className={style}>
                <div className={`${textPosition === 'right' && 'order-last'} flex flex-col gap-10`}>
                    <h2 className={`text-3xl ${background === 'light' && 'text-[var(--title-txt-color)]'}`}>{title}</h2>
                    <p className=''>{description}</p>

                    <RedButton btnAction={btnProps.btnAction} btnText={btnProps.btnText} btnIcon={btnProps.btnIcon}  />
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
                width={560}
                height={200}
            />
        );

        return (
            <Wrapper 
                title='Obiman i sadržajan kurikulum'
                description='Planski smišljen kurikulum za svaki kurs pokriva sve što treba motivisanom i vrijednom programeru da postane performantan softverski inžinjer, od osnova programiranja i objektno-orijentisanog programiranja, do naprednih programskih koncepata i metoda kao i alata za razvoj softvera.'
                btnProps={{
                    btnAction: '/sadrzaj',
                    btnText: 'Istražite sadržaj',
                    btnIcon: <BiBook />
                }}
                background='dark'
                textPosition='left'
                graphic={PythonImg()}
            />
        );
    }

    const Tasks = () => {
        const TaskCards = () => (
            <div>

            </div>
        )

        return (
            <Wrapper
                title='Veliki broj zadataka za vježbu'
                description='Kao što vrijedi za svaku vještinu, što više vježbate pisanje koda, postat ćete bolji. Tačno iz tog razloga nauciProgramiranje.ba nudi veliki broj zadataka za vježbu da bi ste kristalizovali svoje novostečena znanja iz programiranja.
                Da vam ne bi bilo dosadno(što je nemoguće - programiranje je zabavno!), naši zadaci su pažljivo smišljeni i dolaze u više formata.'
                btnProps={{
                    btnAction: '/sadrzaj',
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
        const ProjectsCards = () => (
            <div>

            </div>
        )
        
        return (
            <Wrapper        
                title='Praktični programski zadaci'
                description='Svaki novi programer se eventualno zapita: "Okej, mogu čitati i pisati kod, i mogu rješavati male probleme kodom, ali da li mogu razviti real-world aplikacije?"
                Na sreću Vas, budućeg programera, sa nauciProgramiranje.ba ne morate se to više pitati. Naši praktični projekti služe kao savršena tranzicija sa pisanja početničkog koda, ondosno skripti, na pravljenje naprednog softvera i aplikacija.'
                btnProps={{
                    btnAction: '/sadrzaj',
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
                title='Bogato programsko radno okruženje'
                description='Mi vjerujemo da učenje i vježbanje pisanja koda treba biti što jednostavnije i pristupačnije. Sve treba biti pojednostavljeno da biste se mogli fokusirati na ono najbitnije: pisanje koda.
                Dizajnirano sa jednostavnošću kao prioritetom, naše radno okruženje vam omogućava da primijenite svoje novostečene programerske vještine upravo na nauciProgramiranje.ba web stranici. Trenutno postoje radna okruženja za kurseve osnova web razvoja i programiranja, dok napredne kurseve podučavamo u postojećim alatima, smatrajući da je to najbolji način da vas pripremimo za buduću karijeru.'
                btnProps={{
                    btnAction: '/editor',
                    btnText: 'Pogledajte radno okruženje',
                    btnIcon: <BiCodeBlock />
                }}            
                background='light'
                textPosition='left'
                graphic={EditorImg()}
            />
        );
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
                    {/* <Platform /> */}
                </Container>

                <Curiculum />
                <Tasks />
                <Projects />
                <Editor />
            </main>
        </>
    )
}
