import type { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "motion/react";
import ButtonComponent from "@/components/Button/Button";

interface BackButtonProps extends ComponentPropsWithoutRef<"button"> {
    onBack: (values: object) => void;    
}

export function BackButton({ onBack, ...props }: BackButtonProps) {
    const { getValues } = useFormContext();
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
                onClick={() => onBack(getValues())}
            />
        </motion.div>
    );
}