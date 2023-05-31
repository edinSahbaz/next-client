import { FC } from "react";

const ActionButton: FC<{ text: string, action: () => void, additionalStyles?: string, disabled?: boolean }> = ({ text, action, additionalStyles="", disabled=false }) => (
    <button 
        onClick={action} 
        disabled={disabled}
        className={`w-full ${additionalStyles} text-center text-white transition-all duration-300 mt-6 p-4 rounded-md shadow-md
            ${disabled ? "cursor-not-allowed bg-[var(--disabled-btn-color)]" : "cursor-pointer bg-[var(--ter-txt-color)] hover:shadow-xl"}`}>
        {text}
    </button>
)

export default ActionButton;