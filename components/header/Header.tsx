import Link from "next/link";
import { usePopupManager } from "react-popup-manager";
import LoginModal from "./LoginModal";
import Logo from "./Logo";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import UserContext from "@/lib/context/UserContext";
import { auth } from "@/lib/firebase/firebase";
import { HiUser } from "react-icons/hi";

const Links = () => {
    const router = useRouter();

    interface LinkProps {
        href: string;
        name: string;
    }

    const LinkComponent = (props: LinkProps) => {
        const activeRoute = router.pathname;
        const { href, name } = props;
     
        return <Link href={href} className={`${activeRoute === href ? "border-b-[1px]" : "pb-[1px] hover-underline-animation hover-underline-animation-light"}`}>{name}</Link>
    }

    return (
        <nav className="flex items-center justify-center gap-8 font-[400] text-sm text-[var(--txt-color)]">
            <LinkComponent href="/" name="Šta je nauciProgramiranje.ba?" />
            <LinkComponent href="/kurs" name="Sadržaj" />
            <LinkComponent href="/tim" name="Tim" />
            <LinkComponent href="/kupovina" name="Kupovina" />
        </nav>
    );
}

const LogInBtn = () => {
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

const UserPart = () => (
    <div className="flex items-center justify-center">
        <Link href="/profil" 
        className="text-[var(--txt-color)] text-sm hover:border-2 border-[var(--sec-txt-color)] p-2 rounded-md flex gap-2 items-center">
            <HiUser className="text-xl" />
            {auth.currentUser?.displayName}
        </Link>
    </div>
);

const Header = () => {
    const { user } = useContext(UserContext);

    return ( 
        <header className="grid grid-cols-3 px-32 py-4 absolute top-0 left-0 w-full">
            <Logo simple={false} theme="light" size={null} />
            <Links />
            {user ? <UserPart /> : <LogInBtn />}
        </header>
     );
}
 
export default Header;