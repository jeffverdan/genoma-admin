import { Avatar, Chip } from "@mui/material";
import Form from './@Forms';
import FooterForm from '@/components/Footers/Form';
import { useState } from "react";

export default function Funcionario() {
  const TOTAL_STEPS = 3;

  // const currentStep = useCurrentStep((s) => s.currentStep);
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <div className="funcionario-container">
      <div className="card perfil">
        <Avatar />
        <p>Nome</p>
        <Chip className="chip primary" label={"Cargo"} />

      </div>

      <Form setCurrentStep={setCurrentStep} />

      <FooterForm progress={{ numberOfSteps: TOTAL_STEPS, currentStep: currentStep }} >
        <></>
      </FooterForm>
    </div>
  );
}