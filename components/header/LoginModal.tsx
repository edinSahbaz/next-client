import { PopupProps } from "react-popup-manager";
import Logo from "./Logo";

const RedTop = () => (
    <div className="w-full h-2 bg-[var(--sec-txt-color)] rounded-t-md"></div>
)

const Modal = ({ onClose } : PopupProps) => (
    <div onClick={(e) => e.stopPropagation()}
    className="bg-white shadow-md rounded-md animate__animated animate__slideInRight animate__faster max-w-[380px]">
        <RedTop />

        <div className="w-full p-2 flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl">Prijavite se</h2>
            <Logo simple={true} />
            <p className="text-center">Prijavite se da spremite svoj rad. Mi nećemo postavljati ništa nigdje.</p>
            
            <button className="absolute top-2 right-2" onClick={onClose}>X</button>

            <input type="text"></input>
            <button>Prijavi se</button>
        </div>
    </div>
)

const LoginModal = (props: PopupProps) => {
    const { isOpen, onClose } = props;

    return isOpen ? ( 
        <div onClick={onClose}
        className="fixed w-full h-screen bg-black/50 z-50 grid place-items-center animate__animated animate__fadeIn animate__faster">
            <Modal onClose={onClose} />
        </div>
     ) : null;
}
 
export default LoginModal;