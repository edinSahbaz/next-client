import PageDetails from "@/components/header/PageDetails";
import Head from "next/head";
import { FaCreditCard } from "react-icons/fa";

const Team = () => {
    return ( 
        <>
            <Head>
                <title>Tim | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title='Tim iza nauciProgramiranje.ba'
                    description='Iskusni pojedinci. Snažan tim. Moćna platforma.'
                    hasCode={false}
                    btn={{
                        btnText: 'Upiši se na kurs',
                        btnIcon: <FaCreditCard />,
                        btnAction: '/kupovina'
                    }}
                />
            </main>
        </>
     );
}
 
export default Team;