import { ReactNode } from "react";
import { motion } from "motion/react";


export type FooterPropsType = {
    progress: { numberOfSteps: number, currentStep: number }
    children: ReactNode;
}


export default function FooterForm(props: FooterPropsType) {
    const { progress, children } = props;

    return <footer className="footer-form">
        <div className="progress-motion">
            <div className="div-container">
                <motion.div
                    initial={false}
                    animate={{
                        width: `${(progress.currentStep / progress.numberOfSteps) * 100}%`,
                    }}
                    className="motion"
                />
            </div>
            <>{children}</>
        </div>
    </footer>
}