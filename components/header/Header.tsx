import Link from "next/link";
import { usePopupManager } from "react-popup-manager";
import LoginModal from "./LoginModal";
import Logo from "./Logo";

const Links = () => {
    const linkStyle = "hover-underline-animation";

    return (
        <nav className="flex items-center justify-center gap-8 font-[400] text-sm text-[var(--txt-color)]">
            <Link href="/" className={linkStyle}>Šta je nauciProgramiranje.ba?</Link>
            <Link href="/sadrzaj" className={linkStyle}>Sadržaj</Link>
            <Link href="/tim" className={linkStyle}>Tim</Link>
            <Link href="/kupovina" className={linkStyle}>Kupovina</Link>
        </nav>
    );
}

const LoginBtn = () => {
    const popupManager = usePopupManager();

    return (
        <div className="flex items-center justify-center">
            <button onClick={() => popupManager.open(LoginModal)}
            className="text-[var(--txt-color)] text-sm hover:border-2 border-[var(--sec-txt-color)] p-2 rounded-md">
                Prijavi se
            </button>
        </div>
    );
}

const Header = () => {
    return ( 
        <header className="grid grid-cols-3 p-2 absolute top-0 left-0 w-full">
            <Logo simple={false} />
            <Links />
            <LoginBtn />
        </header>
     );
}
 
export default Header;