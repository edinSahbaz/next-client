import Head from "next/head";
import { ReactNode } from "react";

const ContentContainer = ({ children } : { children: ReactNode }) => (
    <div className="w-full bg-white rounded-md shadow-md">
        {children}
    </div>
)

const Header = () => (
    <div>

    </div>
)

const ProductAccess = () => (
    <div>
        
    </div>
)

const Transactions = () => (
    <div>
        
    </div>
)

const AccountData = () => (
    <div>
        
    </div>
)

const AccountDeletion = () => (
    <div>
        
    </div>
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

            <main>
                <Header />
                <ProductAccess />
                <Transactions />
                <AccountData />
                <AccountDeletion />
            </main>
        </>
     );
}
 
export default Profile;