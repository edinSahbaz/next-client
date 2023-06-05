import '@/styles/globals.css'
import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';
import { Ubuntu } from 'next/font/google'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PopupProvider } from 'react-popup-manager';
import { MoonLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/footer/Footer';
import UserContext from '@/lib/context/UserContext';
import { auth } from '@/lib/firebase/firebase';
import UserType from '@/lib/types/UserType';
import { isCoursePaid } from '@/lib/course/course';
import { Timestamp } from 'firebase/firestore';
import StripeContext from '@/lib/context/StripeContext';

const PythonProvider = dynamic(
    () => import('react-py').then((module) => module.PythonProvider), { ssr: false }
);

const ubuntu = Ubuntu({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // STRIPE
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const router = useRouter();
    
    useEffect( () => { // Check if user is logged in on load
      /* States changed
        * user
        * loading = false (if user is not logged in)
        * loading = true (if user is logged in (MUST WAIT FOR EVERYTHING TO LOAD))
      */
      onAuthStateChanged(auth, async (userVar) => {
        if(userVar){
            //User is logged in
            setLoading(true);

            const retData: {isPaid: boolean, paidDate: Timestamp | null} = await isCoursePaid(userVar.uid, 'python');
            
            const user: UserType = {
                uid: userVar.uid,
                email: userVar.email,
                displayName: userVar.displayName ? userVar.displayName : userVar.email,
                isCoursePaid: retData.isPaid,
                coursePaidDate: retData.paidDate,
            }

            setUser(user);
        }
        else{
            // User is not logged in
            setUser(null);
            setLoading(false);
        }
      });
    } ,[]);
  
    useEffect(() => { // Check if everything is loaded
      if(!user) return;
  
      setLoading(false);
    }, [user]);

    useEffect(() => { // Gets Stripe client secret
        fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret);
        });
    }, []);

    return (
        <StripeContext.Provider value={{ clientSecret }}>
            <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
                <PythonProvider>
                    <PopupProvider>
                        { loading && <div className='w-full h-screen flex items-center justify-center'><MoonLoader color={"#f21b3f"} size={120} /></div> }
                        { !loading && (
                            <div className={`${ubuntu.className} bg-[var(--bg-body-color)]`}>
                                <ToastContainer />
                                <Component {...pageProps} />
                                { !router.pathname.includes("zadaci") 
                                    && <Footer isDark={router.pathname === "/"} /> }
                            </div>
                        )}
                    </PopupProvider>
                </PythonProvider>
            </UserContext.Provider>
        </StripeContext.Provider>
    );
}
