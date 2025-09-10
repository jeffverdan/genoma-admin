import { Avatar, Chip } from "@mui/material";
import Form from './@Forms';
import FooterForm from '@/components/Footers/Form';
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import getUserById, { UserDataColaboradorType } from "@/apis/gerUserById";
import { useRouter } from "next/router";
import useAdminStore from "@/stores/admin/useAdminStore";

interface PropsType {
  userId: string
}

export default function FuncionarioById(props: PropsType) {
  const route = useRouter();
  const { userId } = props;
  // const [userData, setUserData] = useState<UserDataColaboradorType | undefined>();
  const { userData, setUserData } = useAdminStore();

  const TOTAL_STEPS = 3;

  // const currentStep = useCurrentStep((s) => s.currentStep);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const userDataById = async (usuario_id: string) => {
    const data = await getUserById(usuario_id);
    if (data) setUserData(data);
    else route.push('/admin/colaborador');

    console.log("User data: ", data);
  };

  useEffect(() => {
    if (userId) {
      userDataById(userId);
      localStorage.setItem('data', userId);
    } else {
      localStorage.removeItem('data');
    }
    // retorna função de cleanup
    return () => {
      setUserData(undefined);
      localStorage.removeItem('data');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as { userId: string };
  return { props: { userId } };
};