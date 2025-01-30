import { ReactElement } from "react";
import { useState } from "react";
import { MealSelection } from "../steps/MealSelection";
import { ObjectiveStep } from "../steps/Objectives";
import { PlanViewerStep } from "../steps/PlanViewerStep";


const steps = [
    MealSelection,
    ObjectiveStep,
    PlanViewerStep
]



export const BasicPlan = (): ReactElement => {

    const [selection, setSelection] = useState<number>(0)

    const CurrentStep = steps[selection];
    return (
        
        <div className="w-full h-[100vh] grid grid-cols-[1fr] items-center justify-center p-4">
            <CurrentStep nextPage={() => setSelection(selection + 1)} />
        </div>
    )
}