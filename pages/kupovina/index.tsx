import ActionButton from "@/components/general/ActionButton";
import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import HorizontalLine from "@/components/horizontalLine/HorizontalLine";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { BiBook, BiCodeBlock, BiDesktop } from "react-icons/bi";
import { BsGearWide, BsPersonVideo2 } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";
import { ClipLoader } from "react-spinners";
import { FaChalkboardTeacher, FaTasks } from "react-icons/fa";

const PaymentForm = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

    useEffect(() => {
        fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret);
        });
    }, []);

    const Price = () => (
        <div className="mb-8 mt-12 flex flex-col gap-2">
            <p className="flex justify-between"><span><span className="text-[var(--sec-txt-color)] font-[500]">nauciProgramiranje.ba</span>(1-godišnji pristup)</span><span className="text-[var(--title-txt-color)] font-semibold">99.00€</span></p>
            <HorizontalLine width="w-full" height="h-[2px]" color="bg-[#e3e3e3]" />
            <p className="flex justify-between text-xl"><span>Ukupno</span><span className="text-[var(--title-txt-color)] font-semibold">99.00€</span></p>
        </div>
    );

    const LegalInfo = () => (
        <p className="text-sm mt-6">
            Kupujući nauciProgramiranje.ba kurs, prihvatate da ste pročitali i složili se s našim 
            <Link className="text-[var(--sec-txt-color)] font-[700] hover-underline-animation hover-underline-animation-red ml-1" href="/">uvjetima i odredbama</Link>.
        </p>
    );
    
    return clientSecret ? (
        <div className="w-[420px]">
            <Elements options={{ clientSecret: clientSecret }} stripe={stripePromise}>
                <h2 className="text-center text-3xl text-[var(--title-txt-color)]">Za nevjerovatnu cijenu</h2>
                <Price/>
                <PaymentElement />
                <LegalInfo />
                <ActionButton text="Kupi kurs" action={() => {}} />
            </Elements>
        </div>
    ) : (
        <ClipLoader size={70} color="#f21b3f" />
    );
}

const PlatformInfo = () => {
    interface Feature {
        icon: ReactNode;
        description: string;
    }

    const Feature = ({ icon, description }: Feature) => (
        <div className="flex items-center gap-4">
            {icon}
            <p className="font-light ">{description}</p>
        </div>
    )

    const iconStyle = "text-4xl text-[var(--sec-txt-color)]";

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-center text-3xl text-[var(--title-txt-color)] mb-12">Sve što vam treba</h2>

            <div className="w-fit flex flex-col gap-8">
                <Feature icon={<BiDesktop className={iconStyle}/>} description="Jednostavna i intuitivna platforma." />
                <Feature icon={<BiBook className={iconStyle}/>} description="Sveobuhvatan kurikulum." />
                <Feature icon={<FaChalkboardTeacher className={iconStyle}/>} description="Dizajnirano od strane stručnjaka." />
                <Feature icon={<BsPersonVideo2 className={iconStyle}/>} description="Instrukcije visokog kvaliteta." />
                <Feature icon={<FaTasks className={iconStyle}/>} description="Velika baza pitanja za provjeru i vježbu." />
                <Feature icon={<BsGearWide className={iconStyle}/>} description="Praktični programerski projekti." />
                <Feature icon={<BiCodeBlock className={iconStyle}/>} description="Vrhunsko radno okruženje." />
                <Feature icon={<TbCertificate className={iconStyle}/>} description="Certifikat uspješnosti." />
            </div>
        </div>
    );
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
                    <div className="w-full grid grid-cols-[minmax(0,_1fr)_1px_minmax(0,_1fr)] justify-items-center">
                        <PlatformInfo />
                        <div className="h-full w-[1px] bg-[#e3e3e3]"></div>
                        <PaymentForm />
                    </div>
                </Container>
            </main>
        </>
     );
}
 
export default Purchase;
