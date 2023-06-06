import { FC } from "react";

const ActionButton: FC<{ text: string, isSubmit?: boolean, action?: () => void, additionalStyles?: string, disabled?: boolean }> = ({ text, isSubmit, action, additionalStyles="", disabled=false }) => (
    <button 
        onClick={action} 
        disabled={disabled}
        type={isSubmit ? "submit" : "button"}
        className={`w-full ${additionalStyles} text-center text-white transition-all duration-300 mt-6 p-4 rounded-md shadow-md
            ${disabled ? "cursor-not-allowed bg-[var(--disabled-btn-color)]" : "cursor-pointer bg-[var(--ter-txt-color)] hover:shadow-xl"}`}>
        {text}
    </button>
)

export default ActionButton;