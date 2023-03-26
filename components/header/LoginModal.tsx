import { PopupProps } from "react-popup-manager";

const Modal = (props: PopupProps) => {
    const { onClose } = props;

    return (
        <div className="p-20 bg-white shadow-md rounded-md
        animate__animated animate__zoomIn animate__faster">
            <button onClick={onClose}>Close</button>
        </div>
    );
}

const LoginModal = (props: PopupProps) => {
    const { isOpen } = props;

    return isOpen ? ( 
        <div className="fixed w-full h-screen bg-black/50 z-50 grid place-items-center
        animate__animated animate__fadeIn animate__faster">
            <Modal onClose={props.onClose} />
        </div>
     ) : null;
}
 
export default LoginModal;