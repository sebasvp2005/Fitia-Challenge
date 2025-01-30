import { ReactElement, useEffect, useState } from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";
import { usePlanConfigurationStore } from "../../stores/plan.store";
import axios from "axios";
import { Plan } from "../../models/plan";
import { FoodCard } from "../FoodCard";
import { LoadingAnimation } from "../../../shared/components/LoadingAnimation";

export const PlanViewerStep = (): ReactElement => {
    const navigate = useNavigate()

    const planConfiguration = usePlanConfigurationStore(e=>e.configuration)

    const [plan, setPlan] = useState<Plan| null>(null)

    const [loading, setLoading] = useState(true)

    console.log(planConfiguration)

    const onClick = () => {
        navigate('/')
    }   
    const fetchNewPlan = () => {
        setLoading(true)
        axios.post('https://us-central1-fitia-challenge.cloudfunctions.net/fitia-challenge-api/getPlan', planConfiguration)
        .then(response => {
            console.log(response)
            if(response.data == "") 
                setPlan(null)
            else 
                setPlan(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })

    }

    useEffect(() => {
        fetchNewPlan()
    }, [])

    if(loading) {
        return <LoadingAnimation />
    }
    if(plan == null)
        return (
            <>
                <div className="grid grid-cols-1 items-center">
                    <div className="flex flex-col gap-4 items-center">
                        <h1>No se encontro el Plan que buscabas</h1>
                        <p>Por favor, intenta de nuevo con otros requerimientos</p>
                        <button className="bg-primary rounded-2xl py-2 text-white font-semibold text-2xl w-[60%]" onClick={onClick}>Regresar</button>


                    </div>
                </div>
            </>
        )

    
    return (
        <BasicLayout title="Felicidades!" description="Revisa tu nuevo plan generado" buttonText="Regresar al inicio" index={4} onClick={onClick}>
            <div className="flex flex-col gap-4 items-center">
                <div className="w-[60%]">
                    <button className="p-2 bg-primary rounded-3xl text-white font-semibold color-white flex" 
                    onClick={()=>{fetchNewPlan()}}
                    >
                        <img src="\icons\refresh.svg" alt="" />
                        Generar nuevo plan
                    </button>
                </div>
                <div>
                    <span>Calorias </span>
                    <span className="text-3xl">{plan.kcal} </span>
                    <span className="text-3xl">kcal</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className=" flex  flex-col  rounded-2xl border-2 border-red-400 text-red-400 p-2 font-semibold">
                        <span className="text-xl">{plan.protein} g</span>
                        <span>Proteinas</span>
                    </div>
                    <div className=" flex  flex-col  rounded-2xl border-2 border-blue-400 text-blue-400 p-2 font-semibold">
                        <span className="text-xl">{plan.carbs} g</span>
                        <span>Carbs</span>
                    </div>
                    <div className=" flex  flex-col  rounded-2xl border-2 border-yellow-400 text-yellow-400 p-2 font-semibold">
                        <span className="text-xl">{plan.fat} g</span>
                        <span>Grasas</span>
                    </div>
                </div>

                <div className="w-[60%] max-md:w-[90%]">
                    {
                        
                        plan.planItems.map( (item, index) => (
                            <div key={index}>
                                {index !== 0 && <div className=" my-1 h-[1px] bg-gray-200"/>}
                                <FoodCard PlanItem={item} />
                            </div>
                        ))
                    }

                </div>


            </div>
        </BasicLayout>
    )

}