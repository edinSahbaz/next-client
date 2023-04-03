import { FC } from "react";

const ActionButton: FC<{ text: string, action: () => void }> = ({ text, action }) => (
    <button onClick={action} className="w-full text-center mt-6 p-4 bg-[var(--ter-txt-color)] transition-all duration-300 cursor-pointer rounded-md shadow-md hover:shadow-xl text-white">
        {text}
    </button>
)

export default ActionButton;