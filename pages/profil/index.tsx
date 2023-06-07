import Container from "@/components/general/Container";
import Logo from "@/components/header/Logo";
import Head from "next/head";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { BiPackage, BiRefresh } from "react-icons/bi";
import { BsReceipt } from "react-icons/bs";
import { AiFillCheckCircle, AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteUser, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/router";
import UserContext from "@/lib/context/UserContext";
import Forbidden from "@/components/general/Forbidden";
import ActionButton from "@/components/general/ActionButton";
import { readTransactions } from "@/lib/transactions/transactions";
import Link from "next/link";
import { UserTransaction } from "@/lib/types/UserTransaction";

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

const Header = () => (
    <div className="absolute top-0 left-[15%] bg-[var(--bg-color)] hover:bg-[var(--ter-bg-hover-color)] transition-all duration-300 p-1 w-[270px] shadow-md rounded-b-md">
        <Logo simple={true} theme="light" size="small" />
    </div>
)

const ProductAccess = () => {
    interface ProductProps {
        name: string;
        isPaid: boolean;
        remainingTime: number;
        icon: ReactNode;
    }

    const Product = ({ name, isPaid, remainingTime, icon }: ProductProps) => (
        <div className="flex items-center justify-between shadow-md p-4 rounded-md bg-gray-50">
            <p className="">
                <span className="font-semibold text-[var(--sec-txt-color)] text-lg">{ name }</span>
                {
                    !isPaid && (
                        <p className="text-md">
                            <Link href="/kupovina" className="mr-1 text-[var(--sec-txt-color)] hover-underline-animation-red hover-underline-animation">
                                Kupi
                            </Link> 
                            nauciProgramiranje.ba kurs.
                        </p>
                    )
                }
                {isPaid && ` - preostalo ${remainingTime} dana`}
            </p>
            {icon}
        </div>
    )

    const ProductSection = () => {
        const { user } = useContext(UserContext);

        const icon = () => (
            user?.isCoursePaid ? 
            <AiFillCheckCircle className="text-green-700 text-2xl" /> : 
            <AiFillCloseCircle className="text-[var(--sec-txt-color)] text-xl" />
        );

        return (
            <div className="mt-4">
                <Product name="nauciProgramiranje.ba" isPaid={user?.isCoursePaid!} remainingTime={user?.remainingDays || 0} icon={icon()} />
            </div>
        )
    }

    return (
        <ContentContainer icon={<BiPackage className="text-4xl" />} title="Pristup proizvodu" description="" additionalContent={ProductSection()} />
    );
}

const Transactions = () => {
    const { user } = useContext(UserContext);

    const [transactions, setTransactions] = useState<Array<UserTransaction>>([]);
    
    useEffect(() => {
        if(!user) return;
        readTransactions(user?.uid, setTransactions);
    }, []);

    const TransactionsHeader = () => (
        <div className="flex items-center gap-4">
            <p className="font-semibold w-1/2">ID Transakcije</p>
            <p className="w-1/4 text-center">Iznos</p>            
            <p className="w-1/4 text-center">Datum</p>
        </div>
    )

    const Transaction = ({ key, transaction }: { key: number, transaction: UserTransaction}) => (
        <div className="w-full flex items-center text-sm gap-4 shadow-md bg-gray-50 p-2 rounded-md" key={key}>
            <p className="font-semibold w-1/2">{transaction.id.value}</p>
            <p className="w-1/5 font-semibold text-center">{transaction.amount}€</p>            
            <p className="w-1/4 text-center">{transaction.addedDate.toLocaleDateString()} - {transaction.addedDate.toLocaleTimeString()}</p>
        </div>
    )

    const Transactions = () => (
        <div className="flex flex-col gap-2 w-full mt-4">
            {
                transactions.length > 0 ? (
                    <TransactionsHeader />
                ) : (
                    <p>Vaš račun ne posjeduje niti jednu transakciju.</p>
                )
            }
            {
                transactions.map((transaction, index) => (
                    <Transaction key={index} transaction={transaction} />
                ))
            }
        </div>
    )

    return (
        <ContentContainer 
            icon={<BsReceipt className="text-4xl" />} 
            title="Transakcije" 
            description="" 
            additionalContent={Transactions()} />
    );
}

const AccountData = () => {
    const resetAccountData = () => {
        toast.warning("TODO");
    }

    return (
        <ContentContainer 
            icon={<BiRefresh className="text-4xl" />} 
            title="Podaci o računu" 
            description="Želite li ponovo rješavati pitanja na nauciProgramiranje.ba? 
            Želite li brzo proći kroz platformu? Tražite samo svježi početak?
            <br/><br/>
            Svoje podatke računa možete resetovati ovdje, resetovanje podataka je nepovratno.
            <br/><br/>
            Vaši podaci uključuju sav kod i odgovore koje ste napisali, sve videozapise koje ste označili kao pogledane u svim lekcijama na nauciProgramiranje.ba i sve vaše predaje za sva pitanja. 
            Također uključuje i ostale razne podatke na nauciProgramiranje.ba, kao što su opcije vašeg spremljenog radnog prostora." 
            additionalContent={<ActionButton text="Resetuj podatke" action={resetAccountData} />} 
        />
    );
}

const AccountDeletion = () => {
    const router = useRouter();

    const deleteAccount = () => {
        deleteUser(auth.currentUser!);
        router.push("/");    
    }

    return (
        <ContentContainer 
            icon={<AiFillDelete className="text-4xl" />} 
            title="Brisanje računa" 
            description="Ako želite izbrisati svoj račun na nauciProgramiranje.ba, to možete učiniti ovdje.
            <br/><br/>
            Time ćete potpuno izbrisati svoj račun na nauciProgramiranje.ba, uklanjajući sve podatke koje imate na platformi, 
            uključujući spremljeni kod, pristup proizvodu i historiji transakcija." 
            additionalContent={<ActionButton text="Obriši račun" action={deleteAccount} />} 
        />
    );
}

const LogOut = () => {
    const router = useRouter();

    const logOut = () => {
        signOut(auth);
        router.push("/");
    }

    return (
        <ContentContainer 
            icon={<MdLogout className="text-4xl" />} 
            title="Odjava" 
            description="Ukoliko se želite odjaviti sa nauciProgramiranje.ba, to možete učiniti ovdje." 
            additionalContent={<ActionButton text="Odjavi se" action={logOut} />} 
        />
    );
}

const Profile = () => {
    const { user } = useContext(UserContext);

    return user ? ( 
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
     ) : (
        <Forbidden />
     );
}
 
export default Profile;