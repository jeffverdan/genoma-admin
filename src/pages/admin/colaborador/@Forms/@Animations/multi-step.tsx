// multi-step/multi-step.tsx
import type { ReactNode } from "react";
import type { OnNext, OnBack } from "@formity/react";
import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";

export type Status = FormityStatus | EndStatus;

export type FormityStatus = {
    type: "formity";
    moving: boolean;
    submitting: boolean;
};

export type EndStatus = {
    type: "end";
    submitting: boolean;
};

export interface MultiStepValue {
    onNext: OnNext;
    onBack: OnBack;
    status: FormityStatus;
}
import { createContext } from "react";
const MultiStepContext = createContext<MultiStepValue | null>(null);


interface MultiStepProps {
    id: string
    onNext: OnNext;
    onBack: OnBack;
    status: FormityStatus;
    children: ReactNode;
}

export default function MultiStep({
    id,
    onNext,
    onBack,
    status,
    children,
}: MultiStepProps) {
    const values = useMemo(
        () => ({ onNext, onBack, status }),
        [onNext, onBack, status],
    );

    console.log("Status: ", status);

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
                key={id}
                initial={{ opacity: 0, y: 1 * 50 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay: 0.2,
                        type: "spring",
                        visualDuration: 0.3,
                        bounce: 0.4,
                    },
                }}
                exit={{ opacity: 0, y: 0 * -50 }}
                className="h-full"
            >
                <MultiStepContext.Provider value={values}>
                    {children}
                </MultiStepContext.Provider>
            </motion.div>
        </AnimatePresence>        
    );
}