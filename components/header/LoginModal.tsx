const Modal = () => {
    return (
        <div className="p-20 bg-white shadow-md rounded-md
        animate__animated animate__zoomIn animate__faster">

        </div>
    );
}

const LoginModal = () => {
    return ( 
        <div className="fixed w-full h-screen bg-black/50 z-50 grid place-items-center
        animate__animated animate__fadeIn animate__faster">
            <Modal />
        </div>
     );
}
 
export default LoginModal;