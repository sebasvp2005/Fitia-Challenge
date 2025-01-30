import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../HomePage/pages/HomePage";
import { BasicPlan } from "../../Plans/pages/BasicPlan";
import { AdvancedPlan } from "../../Plans/pages/AdvancedPlan";



export const AppRouter = (): ReactElement => {
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/BasicPLan" element={<BasicPlan />} />
            <Route path="/AdvancedPlan" element={<AdvancedPlan/>} />
            <Route path="*" element={<div>404</div>} />
            
        </Routes>
    )
}