import type { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "motion/react";
import ButtonComponent from "@/components/Button/Button";

export interface BackButtonProps extends ComponentPropsWithoutRef<"button"> {
    onBack: (values: object) => void;    
}

export default function BackButton({ onBack }: BackButtonProps) {
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
                onClick={() => getValues ? onBack(getValues()) : null}
            />
        </motion.div>
    );
}