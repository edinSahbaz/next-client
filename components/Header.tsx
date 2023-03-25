import Image from "next/image";
import { Jura } from 'next/font/google'
import Link from "next/link";

const jura = Jura({
    weight: '400',
    subsets: ['latin'],
})

const Logo = () => (
    <div className={`${jura.className} flex items-center justify-center gap-1 text-white`}>
        <Image src="/android-chrome-192x192.png" height={80} width={80} alt="logo" />

        <div className="font-[var(--logo-font)]">
            <h2 className="text-2xl">nauciProgramiranje.ba</h2>
            <p className="text-[13px]"><span className="text-[var(--sec-txt-color)]">Nauči programirati!</span> | by BitWise Solutions</p>
        </div>
    </div>
)

const Links = () => {
    const linkStyle = "hover-underline-animation";

    return (
        <nav className="flex items-center justify-center gap-8 font-light text-sm text-[var(--txt-color)]">
            <Link href="/" className={linkStyle}>Šta je nauciProgramiranje.ba?</Link>
            <Link href="/kursevi" className={linkStyle}>Kursevi</Link>
            <Link href="/tim" className={linkStyle}>Tim</Link>
            <Link href="/kontakt" className={linkStyle}>Kontakt</Link>
        </nav>
    );
}

const LoginBtn = () => (
    <div className="flex items-center justify-center">
        <button className="text-[var(--txt-color)] text-sm hover:border-2 border-[var(--sec-txt-color)] p-2 rounded-md">
            Prijavi se
        </button>
    </div>
)

const Header = () => {
    return ( 
        <header className="grid grid-cols-3 p-2 bg-[var(--bg-color)]">
            <Logo />
            <Links />
            <LoginBtn />
        </header>
     );
}
 
export default Header;