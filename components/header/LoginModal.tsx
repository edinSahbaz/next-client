import { PopupProps } from "react-popup-manager";
import Logo from "./Logo";

const RedTop = () => (
    <div className="w-full h-2 bg-[var(--sec-txt-color)] rounded-t-md"></div>
)

const Modal = ({ onClose } : PopupProps) => (
    <div onClick={(e) => e.stopPropagation()}
    className="bg-white shadow-md rounded-md animate__animated animate__slideInRight animate__faster">
        <RedTop />

        <div className="w-full p-2">
            <h2>Prijavi se</h2>
            <Logo simple={true} />
            <p>Prijavite se da spremite svoj rad. Mi nećemo postavljati ništa nigdje.</p>
            
            
            
            <button onClick={onClose}>Close</button>
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