import PageDetails from "@/components/header/PageDetails";
import Head from "next/head";
import { FaCreditCard } from "react-icons/fa";

const Content = () => {
    return ( 
        <>
            <Head>
                <title>Sadržaj | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title='Ultimativna platforma'
                    description='Sve što treba da naučite programirati na jednom mjestu. Stvarno.'
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
 
export default Content;