import Container from "@/components/general/Container";
import Logo from "@/components/header/Logo";
import Head from "next/head";
import { FC, ReactNode } from "react";
import { BiPackage, BiRefresh } from "react-icons/bi";
import { BsReceipt } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";

interface ContainerProps {
    icon: ReactNode,
    title: string,
    description: string | null,
    additionalContent: ReactNode | undefined | null
}

const ContentContainer: FC<ContainerProps> = ({ icon, title, description, additionalContent }) => (
    <div className="w-full bg-white rounded-md shadow-md p-8 max-w-[800px]">
        <h2 className="flex items-center gap-2 text-2xl text-[var(--title-txt-color)]">{icon} {title}</h2>

        { description && <p className="mt-6" dangerouslySetInnerHTML={{__html: description}}></p> }

        { additionalContent && additionalContent }
    </div>
)

const ActionButton: FC<{ text: string, action: () => void }> = ({ text, action }) => (
    <button onClick={action} className="w-full text-center mt-6 p-4 bg-[var(--ter-txt-color)] transition-all duration-300 cursor-pointer rounded-md shadow-md hover:shadow-xl text-white">
        {text}
    </button>
)

const Header = () => (
    <div className="absolute top-0 left-[15%] bg-[var(--bg-color)] hover:bg-[var(--ter-bg-hover-color)] transition-all duration-300 p-1 w-[270px] shadow-md rounded-b-md">
        <Logo simple={true} theme="light" size="small" />
    </div>
)

const ProductAccess = () => (
    <ContentContainer icon={<BiPackage className="text-4xl" />} title="Pristup proizvodu" description="" additionalContent={null} />
)

const Transactions = () => (
    <ContentContainer icon={<BsReceipt className="text-4xl" />} title="Transakcije" description="" additionalContent={null} />
)

const AccountData = () => {
    const resetAccountData = () => {
        toast.success("Podaci računa su resetovani.");
    }

    return(
        <ContentContainer 
        icon={<BiRefresh className="text-4xl" />} 
        title="Podaci o računu" 
        description="Želite li ponovo rješavati pitanja na ProgrammingExpertu? 
        Želite li brzo proći kroz platformu? Tražite samo svježi početak?
        <br/><br/>
        Svoje podatke računa možete resetovati ovdje, resetovanje podataka je nepovratno.
        <br/><br/>
        Vaši podaci uključuju sav kod i odgovore koje ste napisali, sve videozapise koje ste označili kao pogledane u svim lekcijama na ProgrammingExpertu i sve vaše predaje za sva pitanja. Također uključuje i ostale razne podatke na ProgrammingExpertu, kao što su opcije vašeg spremljenog radnog prostora." 
        additionalContent={<ActionButton text="Resetuj podatke" action={resetAccountData} />} />
    );
}

const AccountDeletion = () => (
    <ContentContainer icon={<AiFillDelete className="text-4xl" />} title="Brisanje računa" description="" additionalContent={null} />
)

const LogOut = () => (
    <ContentContainer icon={<MdLogout className="text-4xl" />} title="Odjava" description="" additionalContent={null} />
)


const Profile = () => {
    return ( 
        <>
            <Head>
                <title>Profil | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-full pt-16">
                <Container>
                    <h2 className="text-[var(--title-txt-color)] text-3xl">Podaci o računu</h2>
                    <Header />
                    <ProductAccess />
                    <Transactions />
                    <AccountData />
                    <AccountDeletion />
                    <LogOut />
                </Container>
            </div>
        </>
     );
}
 
export default Profile;