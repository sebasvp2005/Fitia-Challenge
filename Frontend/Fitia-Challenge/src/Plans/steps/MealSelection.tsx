import { ReactElement, useState } from "react";
import { BasicLayout } from "../layouts/BasicLayout";
import { CustomButton } from "../../shared/components/CustomButton";
import { usePlanConfigurationStore } from "../stores/plan.store";


const options = [
    {
        headline: "Desayuno 🍳🌞",
        text: "Recetas rápidas y balanceadas para empezar el día con energía.",
        target: 'breakfast'
    },
    {
        headline: "Almuerzo 🥗🍴",
        text: "Opciones completas y nutritivas para recargar fuerzas.",
        target: 'lunch'
    },
    {
        headline: "Cena 🌙🍲",
        text: "Comidas ligeras y deliciosas para terminar el día.",
        target: 'dinner'
    }
]

interface Props{
    nextPage: () => void;
}

export const MealSelection = ({nextPage}:Props): ReactElement => {
    const [selection, setSelection] = useState<number|null>(null)

    const setPlanMealType = usePlanConfigurationStore(e=>e.setMealType)

    const onClick = () => {
        if (selection == null) return
        console.log("selection", selection)
        setPlanMealType(options[selection].target)
        nextPage()
    }   
    return (
        <BasicLayout title="Comida" description="Escogamos la comida del dia" buttonText="Siguiente" index={2} onClick={onClick}>
            <div className="flex flex-col gap-4 items-center">
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