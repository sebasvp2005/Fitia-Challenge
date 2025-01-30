import { ReactElement } from "react";

interface Props{
    headline: string;
    text: string;
    onClick: () => void;
    active: boolean;
}

export const CustomButton = ({headline, text, onClick, active}: Props): ReactElement => {
    return (
        <button className= {` transition-all p-4 flex flex-col text-left border-gray-400 border-2 rounded-2xl w-[60%] max-md:w-[80%] ${
            active ? "border-primary" : ""
          }`}
            onClick={onClick}>
            <span className={`text-gray-600 font-semibold text-2xl ${active ? "text-primary" : ""}`}>{headline}</span>
            <span className={`text-gray-500 text-sm ${active ? "text-primary" : ""}`} >{text}</span>
        </button>

    )
}