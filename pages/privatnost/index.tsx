import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import Head from "next/head";
import Link from "next/link";
import { BiInfoCircle } from "react-icons/bi";
import { FaCreditCard } from "react-icons/fa";

const VerticalLine = () => (
    <div className="w-1 bg-[var(--p-txt-color)] rounded-l-sm"></div>
)

const PersonalInfo = () => (
    <div className="bg-white w-full h-fit flex gap-4 rounded-md shadow-sm text-[var(--p-txt-color)]">
        <VerticalLine />
        
        <BiInfoCircle className="mt-4 text-4xl" />

        <div className="py-4">
            <div className="flex items-center text-[#445c6e] font-[500] text-xl">
                <h2>Brisanje ličnih podataka</h2>
            </div>

            <p className="my-4">
                Ako želite obrisati sve lične podatke koje je prikupila stranica nauciProgramiranje.ba, slijedite sljedeće upute:
            </p>

            <ol className="flex flex-col gap-2 ml-4">
                <li>1. Idite na vaš profil, odnosno 
                    <Link href="/profil" className="ml-1 text-[var(--sec-txt-color)] font-[700] hover-underline-animation hover-underline-animation-red">stranicu za profil</Link>.
                </li>
                <li>2. Idite do sekcije <span className="font-[700]">Brisanje Profila</span>.</li>
                <li>3. Kliknite na dugme <span className="font-[700]">Obriši profil</span>.</li>
            </ol>
        </div>
    </div>
)

const Privacy = () => {
    return ( 
        <>
            <Head>
                <title>Politika privatnosti | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title='Politika privatnosti'
                    description='Jer je moramo imati.'
                    hasCode={false}
                    btn={{
                        btnText: 'Upiši se na kurs',
                        btnIcon: <FaCreditCard />,
                        btnAction: '/kupovina'
                    }}
                />

                <Container>
                    <PersonalInfo />
                </Container>
            </main>
        </> 
    );
}
 
export default Privacy;