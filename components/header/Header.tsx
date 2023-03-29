import Link from "next/link";
import { usePopupManager } from "react-popup-manager";
import LoginModal from "./LoginModal";
import Logo from "./Logo";
import { useRouter } from "next/router";
import React from "react";


const Links = () => {
    const router = useRouter();

    interface LinkProps {
        href: string;
        name: string;
    }

    const LinkComponent = (props: LinkProps) => {
        const activeRoute = router.pathname;
        const { href, name } = props;
     
        return <Link href={href} className={`${activeRoute === href ? "border-b-[1px]" : "pb-[1px] hover-underline-animation"}`}>{name}</Link>
    }

    return (
        <nav className="flex items-center justify-center gap-8 font-[400] text-sm text-[var(--txt-color)]">
            <LinkComponent href="/" name="Šta je nauciProgramiranje.ba?" />
            <LinkComponent href="/sadrzaj" name="Sadržaj" />
            <LinkComponent href="/tim" name="Tim" />
            <LinkComponent href="/kupovina" name="Kupovina" />
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
        <header className="grid grid-cols-3 px-32 py-4 absolute top-0 left-0 w-full">
            <Logo simple={false} />
            <Links />
            <LoginBtn />
        </header>
     );
}
 
export default Header;