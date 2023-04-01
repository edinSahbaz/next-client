import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import Head from "next/head";
import Link from "next/link";
import { BiInfoCircle } from "react-icons/bi";
import { FaCreditCard } from "react-icons/fa";

interface ParagrpahProps {
    title: string;
    description: string;
}

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
                <li>2. Idite do sekcije <span className="font-[700]">Brisanje računa</span>.</li>
                <li>3. Kliknite na dugme <span className="font-[700]">Obriši račun</span>.</li>
            </ol>
        </div>
    </div>
)

const Paragrpah = ({ title, description }: ParagrpahProps) => (
    <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="">{description}</p>
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

                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-[var(--title-txt-color)] my-4 text-3xl">Politika privatnosti</h2>

                        <Paragrpah 
                            title="Uvod"
                            description="Zaštita vaših privatnih informacija je naš prioritet. 
                            Ova Izjava o privatnosti se odnosi na website nauciProgramiranje.ba i regulira prikupljanje i korištenje podataka. 
                            Korištenjem nauciProgramiranje.ba web stranice, pristajete na prakse prikupljanja podataka opisane u ovoj izjavi." 
                        />

                        <Paragrpah 
                            title="Prikupljanje vaših ličnih podataka"
                            description="Ako kupite proizvode i usluge nauciProgramiranje.ba, prikupljamo informacije o naplati i kreditnoj kartici. 
                            Ove informacije se koriste za dovršenje transakcije kupovine. 
                            nauciProgramiranje.ba vas potiče da pregledate izjave o privatnosti web stranica na koje se povezujete s nauciProgramiranje.ba kako biste razumjeli kako te web stranice prikupljaju, 
                            koriste i dijele vaše informacije. nauciProgramiranje.ba nije odgovoran za izjave o privatnosti ili druge sadržaje na web stranicama izvan web stranice nauciProgramiranje.ba." 
                        />

                        <Paragrpah 
                            title="Promjene ove izjave"
                            description="nauciProgramiranje.ba će povremeno ažurirati ovu izjavu o privatnosti kako bi odrazila povratne informacije tvrtke i kupaca. 
                            nauciProgramiranje.ba vas ohrabruje da povremeno pregledate ovu izjavu kako biste bili informirani o tome kako nauciProgramiranje.ba štiti vaše informacije." 
                        />
                        
                        <Paragrpah
                            title="Sigurnost vaših osobnih informacija"
                            description="nauciProgramiranje.ba osigurava vaše osobne informacije od neovlaštenog pristupa, upotrebe ili otkrivanja. 
                            nauciProgramiranje.ba koristi SSL protokol u tu svrhu: Kad se osobne informacije (poput broja kreditne kartice) prenose na druge web stranice, 
                            štite se upotrebom enkripcije - SSL protokola(Secure Sockets Layer)."
                        />

                        <Paragrpah
                            title="Kontakt informacije"
                            description="nauciProgramiranje.ba pozdravlja vaša pitanja ili komentare u vezi s ovom izjavom o privatnosti. Ako vjerujete da nauciProgramiranje.ba nije 
                            poštovao ovu izjavu, molimo kontaktirajte nauciProgramiranje.ba tim slanjem poruke putem web stranice."
                        />
                    </div>
                </Container>
            </main>
        </> 
    );
}
 
export default Privacy;