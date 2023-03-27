import '@/styles/globals.css'
import 'animate.css';
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';
import { Ubuntu } from 'next/font/google'
import { PopupProvider } from 'react-popup-manager';

const PythonProvider = dynamic(
    () => import('react-py').then((module) => module.PythonProvider), { ssr: false }
);

const ubuntu = Ubuntu({
    weight: ['300', '400'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <PythonProvider>
            <PopupProvider>
                <main className={ubuntu.className}>
                    <Component {...pageProps} />
                </main>
            </PopupProvider>
        </PythonProvider>
    );
}
