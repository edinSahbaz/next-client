import Container from '@/components/general/Container';
import PageDetails from '@/components/header/PageDetails'
import Head from 'next/head'
import { FaCreditCard } from 'react-icons/fa';

export default function Home() {
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
                
            </Container>
        </main>
        </>
    )
}
