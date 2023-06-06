import ActionButton from "@/components/general/ActionButton";
import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import HorizontalLine from "@/components/horizontalLine/HorizontalLine";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, ReactNode, useContext, useEffect, useState } from "react";
import { BiBook, BiCodeBlock, BiDesktop } from "react-icons/bi";
import { BsGearWide, BsPersonVideo2 } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";
import { MoonLoader } from "react-spinners";
import { FaChalkboardTeacher, FaTasks } from "react-icons/fa";
import { toast } from "react-toastify";
import { buyCourse } from "@/lib/course/course";
import UserContext from "@/lib/context/UserContext";
import StripeContext from "@/lib/context/StripeContext";
import { getDifferenceInDaysFromToday } from "@/lib/util/dateUtil";

const PaymentForm = () => {
    const { user } = useContext(UserContext);
    const { clientSecret } = useContext(StripeContext);

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

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

    const SubscriptionRemainingTime = () => {
        const paidDateTimestamp = user?.coursePaidDate;

        if(!paidDateTimestamp) return null;
        const remainingTime = getDifferenceInDaysFromToday(paidDateTimestamp); 

        return (
            <div className="h-full flex flex-col items-center justify-center">
                <p className="text-center text-3xl text-[var(--title-txt-color)]">Kurs je plaćen!</p>
                <p className="text-center text-lg text-[var(--sec-txt-color)]">Preostalo vrijeme: {remainingTime} dana.</p>
            </div>
        );
    }

    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const [isLoading, setIsLoading] = useState(false);
        const [paymentSuccessful, setPaymentSuccessful] = useState(false);

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            setIsLoading(true);
            e.preventDefault();

            if (!stripe || !elements || !user) {
                setIsLoading(false);
                return;
            }

            stripe.confirmPayment({
                elements,
                confirmParams: { return_url: `${window.location.origin}` },
                redirect: 'if_required',
            }).then(async (result) => {
                if (result.error) {
                    // Show error to customer (e.g., insufficient funds)
                    setIsLoading(false);
                    const error = result.error;

                    if (error.type === "card_error" || error.type === "validation_error") toast.error(error.message);
                    else toast.error("An unexpected error occurred.");
                } else {
                    // The payment has been processed!
                    if (result.paymentIntent.status !== "succeeded") return;
                    setPaymentSuccessful(true);
                    
                    const paymentId = result.paymentIntent.id;
                    await buyCourse(user?.uid, paymentId);

                    toast.success("Kupili ste nauciProgramiranje.ba kurs!");
                }
            });
        };

        return (
            <>
                {
                    paymentSuccessful ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <h2>Platili ste kurs!</h2>
                        </div>
                    ) : (
                        <form id="payment-form" onSubmit={(e) => {
                            handleSubmit(e);
                        }}>
                            <h2 className="text-center text-3xl text-[var(--title-txt-color)]">Za nevjerovatnu cijenu</h2>
                            <Price/>
                            <PaymentElement />
                            <LegalInfo />
                            <ActionButton 
                                text="Kupi kurs" 
                                isSubmit={true} 
                                disabled={isLoading || !stripe || !elements} />
                        </form>
                    )
                }
            </>
        )
    }
    
    return user?.isCoursePaid ? (
        <div className="w-full h-full grid place-items-center">
            <SubscriptionRemainingTime />
        </div>
    ) : (
        <div className="w-[420px]">
            {
                clientSecret ? 
                (
                    <Elements options={{ clientSecret: clientSecret }} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                ) : 
                (
                    <div className="w-full h-full grid place-items-center">
                        <MoonLoader size={70} color="#f21b3f" />
                    </div>
                )
            }
        </div>
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
            <p className="">{description}</p>
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
