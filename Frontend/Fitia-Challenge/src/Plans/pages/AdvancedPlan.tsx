import { ReactElement } from "react";
import { useState } from "react";
import { MealSelection } from "../components/steps/MealSelection";
import { PlanViewerStep } from "../components/steps/PlanViewerStep";
import { AdvancedObjectiveStep } from "../components/steps/AdvancedObjectivesStep";


const steps = [
    MealSelection,
    AdvancedObjectiveStep,
    PlanViewerStep
]



export const AdvancedPlan = (): ReactElement => {

    const [selection, setSelection] = useState<number>(0)

    const CurrentStep = steps[selection];
    return (
        
        <div className="w-full h-[100vh] grid grid-cols-[1fr] items-center justify-center p-4">
            <CurrentStep nextPage={() => setSelection(selection + 1)} />
        </div>
    )
}