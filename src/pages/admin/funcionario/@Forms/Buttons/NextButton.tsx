import type { ComponentPropsWithoutRef } from "react";
import ButtonComponent from "@/components/Button/Button";
import { motion } from "motion/react";

interface NextButtonProps extends ComponentPropsWithoutRef<"button"> {
  submitting?: boolean;
  end?: boolean;
}

export function NextButton({
  submitting = false,
  end,
}: NextButtonProps) {
  return (
    <motion.div
      initial={false}
      whileTap={{ scale: 0.9 }}
    >
      <ButtonComponent 
        type="submit"
        labelColor="white" 
        label={end ? "Salvar e sair" : "Avançar"} 
        variant="contained" 
        disabled={submitting} 
        size="medium" 
      />
    </motion.div>
  );
}