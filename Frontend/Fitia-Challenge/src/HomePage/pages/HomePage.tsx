import { ReactElement, useState } from "react";
import { AnimatePresence } from "motion/react"
import { Home } from "../components/Home";
import { PlanSelector } from "../components/PlanSelector";



export const HomePage = (): ReactElement => {

    const [page, setPage] = useState(0)


    return (
      <AnimatePresence mode="wait">
          <div className="w-full h-[100vh] grid grid-cols-[1fr] items-center justify-center p-4">
              
            {
              page == 0 ?
              <Home setPage={setPage} />
              :
              <PlanSelector/>

            }

          </div>
      </AnimatePresence>

      );
}