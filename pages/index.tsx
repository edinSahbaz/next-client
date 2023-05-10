import Container from '@/components/general/Container';
import PageDetails from '@/components/header/PageDetails'
import Head from 'next/head'
import { ReactNode } from 'react';
import { BiDesktop } from 'react-icons/bi';
import { FaCreditCard } from 'react-icons/fa';

export default function Home() {
    interface IntroElementProps {
        title: string;
        description: string;
        link: string;
        icon: ReactNode;
    }

    const IntroElement = ({title, description, link, icon}: IntroElementProps) => (
        <div>
            {icon}

            <h3 className=''>{title}</h3>
            <p className=''>{description}</p>
            
            <a href={link} className=''>
                Pogledaj više.
            </a>
        </div>
    )

    const Intro = () => {
        const iconStyle = "text-4xl text-[var(--sec-txt-color)]";
        
        const cards: IntroElementProps[] = [
            {
                title: 'Pogodnosti platforme',
                description: 'Učenje programiranja je nesumnjivo zastrašujuće. nauciProgramiranje.ba vam pruža najjednostavniju, najmoderniju platformu, sa svime što vam je potrebno da naučite programiranje lako i bez stresa.',
                link: '',
                icon: <BiDesktop className={iconStyle}/>
            },
            {
                title: 'Pogodnosti platforme',
                description: 'Učenje programiranja je nesumnjivo zastrašujuće. nauciProgramiranje.ba vam pruža najjednostavniju, najmoderniju platformu, sa svime što vam je potrebno da naučite programiranje lako i bez stresa.',
                link: '',
                icon: <BiDesktop className={iconStyle}/>
            },
            {
                title: 'Pogodnosti platforme',
                description: 'Učenje programiranja je nesumnjivo zastrašujuće. nauciProgramiranje.ba vam pruža najjednostavniju, najmoderniju platformu, sa svime što vam je potrebno da naučite programiranje lako i bez stresa.',
                link: '',
                icon: <BiDesktop className={iconStyle}/>
            },
        ]

        return (
            <div>
                <h2>Šta je nauciProgramiranje.ba?</h2>

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
