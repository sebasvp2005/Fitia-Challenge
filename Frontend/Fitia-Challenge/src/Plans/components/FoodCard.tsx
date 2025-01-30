import { ReactElement } from "react";
import { PlanItem } from "../models/plan";

interface Props {
    PlanItem: PlanItem;
}


export const FoodCard = ({PlanItem} : Props ): ReactElement => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img src={PlanItem.food.iconURL} alt="" />
                <span>{PlanItem.food.name}</span>
            </div>
            <div className="text-right">
                <div>
                    {
                        PlanItem.food.servingName == 'g' ?
                        <span>{PlanItem.food.servingSize * PlanItem.serving} g</span> 
                        :
                        <>
                            <span>{PlanItem.serving} </span>
                            <span>{PlanItem.food.servingName} </span>
                            <span>({PlanItem.food.servingSize * PlanItem.serving} g)</span>
                        </>
                    }
                </div>
                <div>
                    <span>{(PlanItem.food.caloriesPerGram * PlanItem.food.servingSize * PlanItem.serving).toFixed(2)} kcal</span>
                </div>
            </div>

        </div>
    )
}