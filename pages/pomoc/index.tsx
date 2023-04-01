import PageDetails from "@/components/header/PageDetails";
import HorizontalLine from "@/components/horizontalLine/HorizontalLine";
import Head from "next/head";
import { ReactNode, useState } from "react";
import { BsGear, BsBug } from "react-icons/bs";
import { BiPackage, BiCreditCard } from "react-icons/bi";
import { FaCreditCard, FaRegHandshake } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import Container from "@/components/general/Container";
interface CardProps {
    title: string;
    icon: ReactNode;
}

const Heading = () => (
    <div className="flex flex-col items-center gap-4 my-12">
        <h2 className="text-4xl text-[var(--title-txt-color)]">Centar za pomoć</h2>
        <HorizontalLine height="h-[2px]" color="bg-[var(--sec-txt-color)]" width="w-[60%]" />
        <p className="text-[var(--p-txt-color)]">Ako imate pitanje ili neki problem, pogledajte kroz naš FAQ ispod.</p>
    </div>
)

const Card = ({ title, icon }: CardProps) => (
    <div className="bg-[#fff] p-10 w-[240px] shadow-sm rounded-md grid place-items-center gap-2 cursor-pointer hover:shadow-xl transition-all duration-500">
        <div className="text-4xl text-[var(--sec-txt-color)]">{icon}</div>
        <h3 className="font-[700]">{title}</h3>
    </div>
)

const Cards = ({ cards }: { cards: Array<CardProps> }) => (
    <div className="w-full grid place-items-center">
        <h3 className="mb-12 text-2xl text-[var(--title-txt-color)]">Kako vam možemo pomoći?</h3>
        <div className="grid grid-cols-3 gap-4">
            {
                cards.map((card, i) => {
                    const { title, icon } = card;

                    return <Card key={i} title={title} icon={icon} />
                })
            }
        </div>
    </div>
)

const Help = () => {
    const [ cards ] = useState<Array<CardProps>>([
        { title: 'Proizvod', icon: <BiPackage /> },
        { title: 'Kupovina', icon: <BiCreditCard /> },
        { title: 'Problemi', icon: <BsGear /> },
        { title: 'Prijava Bugova', icon: <BsBug /> },
        { title: 'Zahtjevi', icon: <HiOutlineLightBulb /> },
        { title: 'Biznis', icon: <FaRegHandshake /> },
    ]);

    return ( 
        <>
            <Head>
                <title>Centar za pomoć | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title='Vi imate pitanja'
                    description='Mi imamo odgovore.'
                    hasCode={false}
                    btn={{
                        btnText: 'Upiši se na kurs',
                        btnIcon: <FaCreditCard />,
                        btnAction: '/kupovina'
                    }}
                />
                
                
                <Container>
                    <Heading />
                    <Cards cards={cards} />
                </Container>
            </main>
        </>
     );
}
 
export default Help;
