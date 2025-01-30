import { ReactElement, useState } from "react";
import { BasicLayout } from "../layouts/BasicLayout";
import { CustomButton } from "../../shared/components/CustomButton";
import { nutrientTarget } from "../models/planConfiguration";
import { usePlanConfigurationStore } from "../stores/plan.store";

const options = [
    {
        headline: "Perder peso 🔥",
        text: "Reduce calorías para quemar grasa de forma saludable mientras mantienes energía y nutrientes esenciales.",
    },
    {
        headline: "Mantener peso ⚖️",
        text: "Equilibra tu consumo calórico para conservar tu peso actual y seguir sintiéndote bien.",
    },
    {
        headline: "Aumentar peso 💪",
        text: "Incrementa calorías con alimentos nutritivos para ganar músculo o masa de manera controlada.",
    }
]

function calculateMacronutrients(weight: number, goal: number, meal:string) {
    // Calories per kg for losing, maintaining, or gaining weight
    const caloriesPerKg = [22, 30, 35]

    const meals : Record<string, number> = {
        breakfast: 30,
        lunch: 35,
        dinner: 35
    }
  
    const totalCalories = weight * caloriesPerKg[goal] * meals[meal] / 100; // total calories per day
  
    const proteinPerKg = 1.5;  // 2 grams of protein per kg of body weight (for fat loss and muscle maintenance)
    const fatByCalories = 0.25; // 25% of the calories from fats
    const carbsByCalories = 0.45; // 45% of the calories from carbohydrates
  
    // Calculate grams of macronutrients
    const protein = proteinPerKg * weight  * meals[meal] / 100; // grams of protein
    const fats = totalCalories * fatByCalories / 9 ; // grams of fat (1 gram of fat = 9 calories)
    const carbs = totalCalories * carbsByCalories / 4 ; // grams of carbohydrates (1 gram of carbs = 4 calories)
  
  
    return {
      totalCalories,
      protein,
      fats,
      carbs,
    };
  }

interface Props{
    nextPage: () => void;
}

export const ObjectiveStep = ({nextPage}:Props): ReactElement => {
    const [selection, setSelection] = useState<number|null>(null)
    const [weight, setWeight] = useState<number|null>(null)
    const configuration = usePlanConfigurationStore(e=>e.configuration)

    const setTargets = usePlanConfigurationStore(e=>e.setNutrientsTargets)


    const onClick = () => {
        if (selection == null || weight==null) return

        console.log("selection", selection)
        console.log(selection, weight)

        const targets: nutrientTarget[] = []
        const {totalCalories, protein, fats, carbs} = calculateMacronutrients(weight!, selection, configuration.mealType)

        targets.push({name: "calories", limit: totalCalories, strictMode: true, priority: 'medium'})
        targets.push({name: "proteins", limit: protein, strictMode: true, priority: 'medium'})
        targets.push({name: "fats", limit: fats, strictMode: true, priority: 'medium'})
        targets.push({name: "carbs", limit: carbs, strictMode: true, priority: 'medium'})

        setTargets(targets)

        nextPage()
    } 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(Number(e.target.value))
    }


    return (
        <BasicLayout title="Objetivo" description="Cual es nuestra meta?" buttonText="Siguiente" index={3} onClick={onClick}>

            <div className="flex flex-col gap-4 items-center">
                <div>
                    <span>Peso actual: </span>
                    <input className=" text-right mr-1 text-4xl w-[90px] border-b-2 border-gray-400 outline-none focus:border-gray-600 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none " 
                    type="number"
                    onChange={handleChange}
                    value={weight??""}
                    />
                    <span className="text-3xl">kg</span>
                </div>
                {
                    options.map((option, index) => (
                        <CustomButton 
                            key={option.headline}
                            headline={option.headline}
                            text={option.text}
                            active={selection === index}
                            onClick={() => setSelection(index)}
                        />
                    ))
                }
                
            </div>

        </BasicLayout>
    )
}