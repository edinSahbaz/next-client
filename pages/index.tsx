import Container from '@/components/general/Container';
import PageDetails from '@/components/header/PageDetails'
import Head from 'next/head'
import Link from 'next/link';
import { ReactNode } from 'react';
import { AiOutlineDatabase } from 'react-icons/ai';
import { BiBook, BiCodeBlock, BiDesktop, BiMovie } from 'react-icons/bi';
import { BsPersonCheck } from 'react-icons/bs';
import { FaCreditCard } from 'react-icons/fa';
import { MdChecklistRtl } from 'react-icons/md';
import { TbCertificate } from 'react-icons/tb';

export default function Home() {
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

    const Intro = () => {
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
                </Container>
            </main>
        </>
    )
}
