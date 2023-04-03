import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";

const Purchase = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret: "",
        appearance,
      };

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

                <Container>
                    <Elements options={options} stripe={stripePromise}>
                        <PaymentElement />
                    </Elements>
                </Container>
            </main>
        </>
     );
}
 
export default Purchase;
