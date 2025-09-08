// components/form-step-container.tsx
import type { ReactNode } from "react";
import { motion } from "motion/react";

interface FormStepContainerProps {
  children: ReactNode;
  progress: {
    numberOfSteps: number;
    currentStep: number;
  };
}

export default function FormStepProgress({
  children,
  progress,
}: FormStepContainerProps) {
  return (
    <div className="progress-motion">
      <div className="div-container">
        <motion.div
          initial={false}
          animate={{
            width: `${(progress?.currentStep || 0 / progress?.numberOfSteps || 0) * 100}%`,
          }}
          className="motion"
        />
      </div>
      <>{children}</>
    </div>
  );
}