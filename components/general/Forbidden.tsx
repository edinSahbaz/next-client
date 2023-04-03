import Head from "next/head";
import Logo from "../header/Logo";
import { usePopupManager } from "react-popup-manager";
import LoginModal from "../header/LoginModal";

const Header = () => (
    <div className="absolute top-0 left-[15%] bg-[var(--bg-color)] hover:bg-[var(--ter-bg-hover-color)] transition-all duration-300 p-1 w-[270px] shadow-md rounded-b-md">
        <Logo simple={true} theme="light" size="small" />
    </div>
)

const Forbidden = () => {
    const popupManager = usePopupManager();

    return ( 
        <>
            <Head>
                <title>Zabranjen pristup | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-full h-[calc(100vh-12rem)] flex items-center justify-center flex-col">
                <Header />
                {/* <h1 className="text-5xl font-semibold text-[var(--sec-txt-color)]">Zabranjen pristup</h1>
                <p className="text-sm mt-2">Morate biti prijavljeni kako bi pristupili ovoj stranici ili sadržaju.</p> */}
                <p className="text-2xl">
                    <span onClick={() => popupManager.open(LoginModal)}
                        className="text-[#626ee3] hover-underline-animation hover-underline-animation-purple font-semibold mr-1 cursor-pointer">
                        Prijavite se
                    </span> 
                    kako bi ste nastavili.
                </p>
            </div>
        </>
     );
}
 
export default Forbidden;