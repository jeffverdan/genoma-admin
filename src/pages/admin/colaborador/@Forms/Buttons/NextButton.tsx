import type { ComponentPropsWithoutRef } from "react";
import ButtonComponent from "@/components/Button/Button";
import { motion } from "motion/react";
import { HiArrowRight } from "react-icons/hi2";
import { Check } from "@mui/icons-material";

interface NextButtonProps extends ComponentPropsWithoutRef<"button"> {
  submitting?: boolean;
  end?: boolean;
}

export default function NextButton({
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
        endIcon={end ? <Check /> : <HiArrowRight fill="white" /> }
        size="medium" 
      />
    </motion.div>
  );
}