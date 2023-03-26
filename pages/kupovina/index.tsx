import PageDetails from "@/components/header/PageDetails";
import Head from "next/head";
import { FaCreditCard } from "react-icons/fa";

const Purchase = () => {
    return ( 
        <>
            <Head>
                <title>Kupovina | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title='Ultimativna platforma'
                    description='Učenje programiranja nikada nije bilo ovako lagano.'
                    hasCode={false}
                    btn={null}
                />
            </main>
        </>
     );
}
 
export default Purchase;
