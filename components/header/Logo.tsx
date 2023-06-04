import { Jura } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const jura = Jura({
    weight: '400',
    subsets: ['latin'],
})

interface LogoProps { 
    simple: boolean
    theme: "light" | "dark"
    size: "small" | "normal" | "smaller" | null | undefined
}

const Logo: FC<LogoProps> = ({ simple, theme, size }) => {
    const textColor = theme === "dark" ? "text-[var(--title-txt-color)]" : "text-[var(--txt-color)]";

    return (
        <Link href="/" className={`${jura.className} ${size === "small" ? "scale-75" : size === "smaller" ? "scale-50" : ""} flex items-center justify-center gap-4 ${textColor}`}>
            <Image className="hover:transform hover:rotate-90 transition-all duration-[800ms] fill-white"
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-white.svg"} height={40} width={40} alt="logo" />

            <div className="font-[var(--logo-font)]">
                <h2 className="text-2xl">nauciProgramiranje.ba</h2>
                { simple ? null : <p className="text-[13px]">
                    <span className="text-[var(--sec-txt-color)]">Nauči programirati!</span> | 
                    <Link href="/" className="ml-1 hover-underline-animation hover-underline-animation-light">by BitWise Solutions</Link></p> }
            </div>
        </Link>
    );
}

export default Logo;