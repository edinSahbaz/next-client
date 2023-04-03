import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { useEffect, useState } from "react";

const PaymentForm = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

    useEffect(() => {
        fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret);
        });
    }, []);

    return clientSecret ? (
        <Elements options={{ clientSecret: clientSecret }} stripe={stripePromise}>
            <PaymentElement />
        </Elements>
    ) : null;
}

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

                <Container>
                    <div className="w-full grid grid-cols-2">
                        <PaymentForm />
                    </div>
                </Container>
            </main>
        </>
     );
}
 
export default Purchase;
