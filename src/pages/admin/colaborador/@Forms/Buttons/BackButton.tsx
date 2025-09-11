import type { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "motion/react";
import ButtonComponent from "@/components/Button/Button";
import { FormColaboradoresDataType } from "../@Steps/@Schema";

export interface BackButtonProps extends ComponentPropsWithoutRef<"button"> {
    onBack?: (values: FormColaboradoresDataType) => void;        
    setIndex?: (e: undefined) => void // VOLTAR DO MODO DE EDIÇÃO
}

export default function BackButton({ onBack, setIndex }: BackButtonProps) {
    const getValues = useFormContext()?.getValues;
    return (
        <motion.div
            initial={false}
            whileTap={{ scale: 0.9 }}
        >
            <ButtonComponent
                type="button"
                size="medium"
                label='Voltar'
                variant="outlined"
                onClick={() => setIndex ? setIndex(undefined) : onBack ? onBack(getValues() as FormColaboradoresDataType) : ''}
            />
        </motion.div>
    );
}