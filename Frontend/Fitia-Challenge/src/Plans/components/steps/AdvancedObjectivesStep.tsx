import { ReactElement,  useState } from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import { nutrientTarget } from "../../models/planConfiguration";
import { usePlanConfigurationStore } from "../../stores/plan.store";
import { AdvanceOption } from "../AdvanceOption";
import { Nutrient, NutrientOptions } from "../../models/planConfiguration";


interface Props{
    nextPage: () => void;
}

export const AdvancedObjectiveStep = ({nextPage}:Props): ReactElement => {

    const setTargets = usePlanConfigurationStore(e=>e.setNutrientsTargets)

    const [options, setOptions] = useState<NutrientOptions>({
        calories: null,
        proteins: null,
        carbs: null,
        fats: null
    })

    

    const onClick = () => {
        const targets: nutrientTarget[] = []

        Object.entries(options).forEach(([key, value]) => {
            if(value != null){
                targets.push({
                    name: key,
                    limit: value.limit,
                    strictMode: value.strictMode,
                    priority: value.priority
                })
            } 
            console.log(`Nutrient: ${key}, Value:`, value);
        });
        console.log("Targets", targets)
        setTargets(targets)
        nextPage()

    } 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptions({...options, calories: {
            limit: Number(e.target.value),
            strictMode: true,
            priority: 'medium'
        }})
    }

    const updateOption = (name : keyof NutrientOptions) => {
        return (Nutrient: Nutrient|null)=>{
            console.log('setting', name, Nutrient)
            let curOptions = {...options}
            curOptions[name] = Nutrient
            setOptions({...curOptions})

        }
    }


    return (
        <BasicLayout title="Objetivo" description="Cual es nuestra meta?" buttonText="Siguiente" index={3} onClick={onClick}>

            <div className="flex flex-col gap-8 items-center ">
                <div>
                    <span>Calorias: </span>
                    <input className=" text-right mr-1 text-4xl w-[90px] border-b-2 border-gray-400 outline-none focus:border-gray-600 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none " 
                    type="number"
                    onChange={handleChange}
                    value={options.calories?.limit ?? ""}
                    />
                    <span className="text-3xl">kcal</span>
                </div>

                <AdvanceOption name={'Proteina'} item = {options.proteins} updateItem={updateOption('proteins')}/>

                <div className=" w-[60%] max-md:w-[90%] h-[2px] bg-gray-200"/>
                <AdvanceOption name={'Carbs'} item = {options.carbs} updateItem={updateOption('carbs')}/>

                <div className=" w-[60%] max-md:w-[90%] h-[2px] bg-gray-200"/>
                <AdvanceOption name={'Grasas'} item = {options.fats} updateItem={updateOption('fats')}/>

                
            </div>

        </BasicLayout>
    )
}