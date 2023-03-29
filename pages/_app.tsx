import UserContext from '@/lib/context/UserContext';
import { auth } from '@/lib/firebase/firebase';
import UserType from '@/lib/types/UserType';
import '@/styles/globals.css'
import 'animate.css';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';
import { Ubuntu } from 'next/font/google'
import { useEffect, useState } from 'react';
import { PopupProvider } from 'react-popup-manager';
import { ClipLoader } from 'react-spinners';

const PythonProvider = dynamic(
    () => import('react-py').then((module) => module.PythonProvider), { ssr: false }
);

const ubuntu = Ubuntu({
    weight: ['300', '400'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect( () => { // Check if user is logged in on load
      /* States changed
        * user
        * loading = false (if user is not logged in)
        * loading = true (if user is logged in (MUST WAIT FOR EVERYTHING TO LOAD))
      */
      onAuthStateChanged(auth, (userVar) => {
        if(userVar){
            //User is logged in
            setLoading(true);
            
            const user: UserType = {
                uid: userVar.uid,
                email: userVar.email,
                displayName: userVar.displayName ? userVar.displayName : userVar.email,
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
                    { !loading && <Component {...pageProps} /> }
                </PopupProvider>
            </PythonProvider>
        </UserContext.Provider>
    );
}
