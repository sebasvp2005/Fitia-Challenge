import { ReactElement } from "react";
import { motion } from "motion/react"

interface Props{
    title: string;
    description: string;
    children: ReactElement;
    buttonText: string;
    index:number;
    onClick: () => void;
}

export const BasicLayout = ({title, description, children, buttonText, index, onClick} : Props): ReactElement => {
    return (
        <div className="h-full w-full transition-colors flex flex-col items-center">
            <a className="flex items-center w-full" href="/">
                <img src="/img/app-icon.svg" alt="" className="mr-2 h-[50px]" />
                <img src="/img/gr.webp" alt="" className="h-[25px]" />
            </a>

            <motion.div className="p-10 flex-1 flex flex-col max-md:p-4 w-[80%] max-lg:w-full items-center"  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity:0}} transition={{ duration: 1 }}>
                <span className="text-3xl font-bold w-full">{title}</span>
                <div className="flex  w-full">
                    <span className="mr-1">{`${index}.`}</span>
                    <span>{description}</span>
                </div>

                <div className="flex-1 h-full w-full items-center flex-col my-4">
                    {children}

                </div>

                <button className={`bg-primary rounded-2xl py-2 text-white font-semibold text-2xl w-[60%]`} onClick={onClick}>{buttonText}</button>

            </motion.div>
        </div>


    )
}