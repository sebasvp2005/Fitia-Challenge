import { ReactElement, useState } from "react";
import { motion } from "motion/react";
import { Dropdown, DropdownChangeEvent  } from "primereact/dropdown";
import { Nutrient } from "../models/planConfiguration";

interface Props{
    updateItem: (Nutrient: Nutrient|null) => void;
    item: Nutrient|null;
    name :string
}

export const AdvanceOption = ({item, updateItem, name} : Props): ReactElement => {

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked){
            updateItem({
                limit: 200,
                priority: 'medium',
                strictMode: false
            })
            setCurPriority({name: 'Medio', property: 'medium'})
            setOption({name: 'Maximizar'})
            setValue(20)
        }else{
            updateItem(null)
        }
    };

    const options = [
        {name : 'Aproximar'},
        {name: 'Minimizar'},
        {name: 'Maximizar'}
    ]

    const [option, setOption] = useState<{ name: string } | null>(null);

    const selectOption = (e: DropdownChangeEvent )=>{
        setOption(e.value)
        if(item == null) return

        if (e.value.name == 'Minimizar'){
            updateItem({
                ...item,
                limit: 0,
            })
        }else{
            updateItem({
                ...item,
                limit: 200,
            })
        }
        
    }

    const [curPriority, setCurPriority] = useState<{ name: string; property: string } | null>(null);

    const priorities = [
        { name: 'Bajo', property: 'low' },
        { name: 'Medio', property: 'medium' },
        { name: 'Alto', property: 'high' },
        { name: 'Estricto', property: 'strict' }
    ].filter(p => !(option?.name === 'Minimizar' || option?.name === 'Maximizar') || p.property !== 'strict');

    const selectPriority = (e: DropdownChangeEvent )=>{
        setCurPriority(e.value)
        if(item == null) return
        if(e.value.name == 'Estricto'){
            updateItem({
                ...item,
                strictMode: true
            })
        }else{
            updateItem({
                ...item,
                strictMode: false,
                priority: e.value.property
            })
        }

    }

    const [value, setValue] = useState(20)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value))
        if(item == null) return
        updateItem({
            ...item,
            limit: Number(e.target.value)
        })
    }

    return (
        <div className="w-[60%] max-md:w-[90%]">
            <div className="  flex justify-between items-center">
                <span>{name}</span>
                <input type="checkbox" checked={item!=null} onChange={handleCheckboxChange}/>
            </div>
            {
                item!=null &&

                <motion.div className="flex flex-col gap-2 mt-2 ">
                    <div className="flex justify-between items-center">
                        <div className="w-[40%] flex">
                            <span>Objetivo: </span>
                            <Dropdown value={option} onChange={selectOption} options={options} optionLabel="name" 
                            placeholder="" className="w-full md:w-14rem ml-4" />
                        </div>
                        {
                            option?.name === 'Aproximar' &&
                            <div>

                                <input type="number" className="text-right mr-1  w-[60px] text-lg border-b-2 border-gray-400 outline-none focus:border-gray-600 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                value={value}
                                onChange={handleChange}
                                />
                                <span> g</span>
                            </div>
                        }
                    </div>
                    <div className="flex w-[40%] items-center">
                        <span>Prioridad</span>
                        <Dropdown value={curPriority} onChange={selectPriority} options={priorities} optionLabel="name" 
                        placeholder="" className="w-full md:w-14rem ml-4" />
                    </div>
                
                </motion.div>

            }

        </div>
    )
}  