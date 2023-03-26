import '@/styles/globals.css'
import 'animate.css';
import Header from '@/components/header/Header';
import type { AppProps } from 'next/app'
import { Ubuntu } from 'next/font/google'
import { PopupProvider } from 'react-popup-manager';

const ubuntu = Ubuntu({
    weight: ['300', '400'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PopupProvider>
        <main className={ubuntu.className}>
            <Header />
            <Component {...pageProps} />
        </main>
    </PopupProvider>
  );
}
