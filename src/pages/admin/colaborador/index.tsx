import { Avatar, Chip } from "@mui/material";
import Form from './@Forms';
import FooterForm from '@/components/Footers/Form';
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import getUserById, { UserDataColaboradorType } from "@/apis/gerUserById";
import { useRouter } from "next/router";

export default function FuncionarioById() {
  const route = useRouter();  
  const [userData, setUserData] = useState<UserDataColaboradorType | undefined>()

  const TOTAL_STEPS = 3;

  // const currentStep = useCurrentStep((s) => s.currentStep);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    localStorage.removeItem('data');
    // retorna função de cleanup
    return () => {
      setUserData(undefined);
      localStorage.removeItem('data');
    };
  }, []);

  return (
    <div className="funcionario-container">
      <div className="card perfil">
        <Avatar />
        <p className="p1">{userData?.nome || '---'}</p>
        {userData?.cargos.map((cargo) => <Chip className="chip primary" label={cargo.cargo} key={cargo.id} />)}
        {userData?.lojas.map((loja) => <Chip className="chip green" label={loja.nome} key={loja.loja_id} />)}
      </div>

      {userData && <Form setCurrentStep={setCurrentStep} />}

      <FooterForm progress={{ numberOfSteps: TOTAL_STEPS, currentStep: currentStep }} >
        <></>
      </FooterForm>
    </div>
  );
}