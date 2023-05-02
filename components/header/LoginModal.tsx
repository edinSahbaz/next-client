import { PopupProps } from "react-popup-manager";
import Logo from "./Logo";
import { HiUser } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdEmail, MdKey } from "react-icons/md";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { auth } from "@/lib/firebase/firebase";
import { MoonLoader } from "react-spinners";
import UserContext from "@/lib/context/UserContext";

const RedTop = () => (
    <div className="w-full h-2 bg-[var(--sec-txt-color)] rounded-t-md"></div>
)

interface InputProps {
    icon: ReactNode;
    placeholder: string;
    value: string;
    type: string;
    onChange: Dispatch<SetStateAction<string>>;
}

const Input = (props: InputProps) => {
    const { icon, placeholder, value, onChange, type } = props;
    
    return (
        <div className="w-full relative">
            {icon}
            <input type={type} value={value} onChange={e => onChange(e.target.value)}
            className="text-sm w-full shadow-md p-2 pl-8 border-[1px] rounded-md" placeholder={placeholder} />
        </div>
    );
}

const Modal = ({ onClose } : PopupProps) => {
    type AuthMethod = "login" | "register";

    const [name, setName] = useState<string>(''); // Name input
    const [email, setEmail] = useState<string>(''); // Email input
    const [password, setPassword] = useState<string>(''); // Password input
    const [repeatPassword, setRepeatPassword] = useState<string>(''); // Repeat password input
    const [submitMessage, setSubmitMessage] = useState<string>(''); // Message text
    const [isDisabled, setIsDisabled] = useState<boolean>(false); // Button disabled
    const [method, setMethod] = useState<AuthMethod>('login'); // Button disabled
    
    const iconClassName = "absolute top-[9px] left-2 text-xl text-[var(--bg-color)]"; // className for icons in input

    useEffect(() => { // Show error message
        if(!submitMessage) return;

        if(submitMessage !== "Processing") {
            toast.error(submitMessage);
        }
    }, [submitMessage])

    const login = () => { // Login logic
        setSubmitMessage("Processing");

        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            setSubmitMessage(capitalizeFirstLetter(error.code.substr(error.code.indexOf("/") + 1).replace(/-/g, " ")));
            setIsDisabled(false);
        });
    }

    const register = () => {
        if(!name) return setSubmitMessage("Unesite puno ime!");
        if(password !== repeatPassword) return setSubmitMessage("Lozinke se ne podudaraju!");

        setSubmitMessage("Processing");

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateProfile(userCredential.user, {
                displayName: name
            });
        })
        .catch((error) => {
            setSubmitMessage(capitalizeFirstLetter(error.code.substr(error.code.indexOf("/") + 1).replace(/-/g, " ")));
            setIsDisabled(false);
        });
    }

    const changeMethod = () => {
        setMethod(method === "login" ? "register" : "login");
    }

    return(
        <div onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-md rounded-md animate__animated animate__slideInRight animate__faster w-[420px]">
            <RedTop />

            <div className="w-full p-4 flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl">
                    {method === "login" ? "Prijavite se" : "Registrujte se"}
                </h2>

                <Logo simple={true} theme="dark" size={null} />
                <p className="text-center text-[var(--bg-color)] text-sm font-light my-4">
                    Prijavite se da spremite svoj rad. <br/>Mi nećemo postavljati ništa nigdje.
                </p>
                
                <div className="absolute top-3 right-2 text-xl cursor-pointer" onClick={onClose}>
                    <IoClose /> 
                </div>

                { method === "register" && <Input icon={<HiUser className={iconClassName }/>} value={name} onChange={setName} placeholder="Ime i prezime" type="text" /> }
                <Input icon={<MdEmail className={iconClassName }/>} value={email} onChange={setEmail} placeholder="Email" type="text" />
                <Input icon={<MdKey className={iconClassName} />} value={password} onChange={setPassword} placeholder="Lozinka" type="password" />
                { method === "register" &&  <Input icon={<MdKey className={iconClassName} />} value={repeatPassword} onChange={setRepeatPassword} placeholder="Ponovite lozinku" type="password" /> }
                {
                    method === "register" && password !== repeatPassword && (
                        <p className="text-xs -mt-3 text-[var(--sec-txt-color)] text-left w-full">Šifre se ne podudaraju.</p>
                    )
                }

                <button onClick={() => {
                    if(method === "login") login();
                    else register();
                }} disabled={isDisabled}
                    className="w-full p-2 shadow-md rounded-md grid place-items-center bg-[var(--ter-bg-color)] hover:bg-[var(--ter-bg-hover-color)] text-white transition-all duration-300">
                    {submitMessage === "Processing" ? <MoonLoader color="#fff" size={14} className="my-[2px]" /> : method === "login" ? "Prijavite se" : "Registrujte se"}
                </button>

                <p className="text-sm">
                    {method === "login" ? "Nemate račun?" : "Već imate račun?"}
                    <span onClick={changeMethod} 
                    className="text-[var(--sec-txt-color)] hover:text-[var(--ter-txt-color)] cursor-pointer ml-1 hover-underline-animation hover-underline-animation-red">
                        {method === "login" ? "Registrujte se." : "Prijavite se."}
                    </span>
                </p>
            </div>
        </div>
    );
}

const LoginModal = (props: PopupProps) => {
    const { isOpen, onClose } = props;
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(!onClose) return;
        if(user) onClose();
    }, [user, onClose])

    return isOpen && !user ? ( 
        <div onClick={onClose}
        className="fixed w-full h-screen bg-black/50 z-50 grid place-items-center animate__animated animate__fadeIn animate__faster">
            <Modal onClose={onClose} />
        </div>
     ) : null;
}
 
export default LoginModal;