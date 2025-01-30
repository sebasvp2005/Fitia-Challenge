import { ReactElement } from "react";
import { motion } from "motion/react"

interface Props {
    setPage : (page: number) => void;
}

export const Home = ({setPage}:Props): ReactElement => {  
    return(
            <div className="flex flex-col items-center space-y-[100px]">

                <motion.div className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity:0}} transition={{ duration: 1 }}>
                <img src="/img/app-icon.svg" alt="" className="w-[150px] mr-4"/>
                <div>
                    <img src="/img/gr.webp" alt="" className="w-[200px]" />
                    <span className="text-4xl mt-[-100px]">plan builder</span>
                </div>

                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity:0}} transition={{ duration: 1, delay: 1 }} >
                <button className="bg-primary py-4 px-8 text-3xl text-white  font-semibold rounded-[0.75rem] " onClick= {()=>setPage(1)} >
                    Empezar
                </button>

                </motion.div>

            </div>
    )
}