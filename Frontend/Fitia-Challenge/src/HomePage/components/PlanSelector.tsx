import { ReactElement } from "react";
import { BasicLayout } from "../../Plans/layouts/BasicLayout";
import { CustomButton } from "../../shared/components/CustomButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";





export const PlanSelector = (): ReactElement => {

    const [plan, setPlan] = useState<null|number>(null)
    const navigate = useNavigate()

    const onClick = () => {
        if (plan == null) return
        navigate(`/${plan === 0 ? 'BasicPlan' : 'AdvancedPlan'}`)
    }
    return (
        
        <BasicLayout 
            title="Configuracion" 
            description="Elijamos la configuracion de nuestro plan"
            buttonText="Siguiente" 
            index={1} 
            onClick={onClick}
        >

            <div className="flex flex-col gap-4 items-center">
                <CustomButton 
                headline="Basico 🥗✨" 
                text="Para los usuarios que buscan simplicidad: ingresa tu peso y objetivo para generar un plan de comida rápido y efectivo." 
                active={plan === 0}
                onClick={() => {setPlan(0)}}/>

                <CustomButton 
                headline="Avanzado 🥑📊" 
                text="Para los usuarios con metas específicas: personaliza macronutrientes para maximizar o minimizar según tus necesidades." 
                active={plan === 1}
                onClick={() => {setPlan(1)}}/>


            </div>

        </BasicLayout>
    )
}