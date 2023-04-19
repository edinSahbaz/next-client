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
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/footer/Footer';
import UserContext from '@/lib/context/UserContext';
import { auth } from '@/lib/firebase/firebase';
import UserType from '@/lib/types/UserType';
import { isCoursePaid } from '@/lib/course/course';
import { Timestamp } from 'firebase/firestore';

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

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            <PythonProvider>
                <PopupProvider>
                    { loading && <div className='w-full h-screen flex items-center justify-center'><ClipLoader color={"#f21b3f"} size={120} /></div> }
                    { !loading && (
                        <div className={`${ubuntu.className} bg-[var(--bg-body-color)]`}>
                            <ToastContainer />
                            <Component {...pageProps} />
                            { router.pathname !== '/editor' && <Footer /> }
                        </div>
                    )}
                </PopupProvider>
            </PythonProvider>
        </UserContext.Provider>
    );
}
