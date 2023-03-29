import Link from "next/link";
import HorizontalLine from "../horizontalLine/HorizontalLine";

const Footer = () => {
    const year = new Date().getFullYear();

    const FooterLink = ({ href, text }: { href: string; text: string }) => (
        <Link href={href} className="hover-underline-animation hover-underline-animation-dark">{text}</Link>
    )

    const Separator = () => (
        <div className="h-full w-[2px] bg-[var(--p-txt-color)]"></div>
    );

    return ( 
        <footer className="w-full p-6 flex flex-col items-center text-[var(--p-txt-color)] text-[15px]">
            <HorizontalLine width="w-[90%]" color="bg-[#e3e3e3]" />
        
            <div className="flex h-[18px] items-center gap-4 mt-8">
                <FooterLink href="/" text="Kontakt" />
                <Separator />
                <FooterLink href="/" text="FAQ" />
                <Separator />
                <FooterLink href="/" text="Politika privatnosti" />
            </div>

            <p className="mt-2">Razvoj i dizajn: <FooterLink text="BitWise Solutions" href="/" /></p>

            <p className="mt-4">Copyright © {year} nauciProgramiranje.ba | Sva prava pridržana.</p>
        </footer>
     );
}
 
export default Footer;