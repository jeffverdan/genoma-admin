/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Chip } from "@mui/material";
import Form from './@Forms';
import FooterForm from '@/components/Footers/Form';
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useAdminStore from "@/stores/admin/useAdminStore";
import FormLeitura from "./@Forms/@Steps/@OnlyRead";
import ButtonComponent from "@/components/Button/Button";
import { HiArrowLeft } from "react-icons/hi2";

interface PropsType {
  userId: string
}

export default function FuncionarioById(props: PropsType) {
  const route = useRouter();
  const { userId } = props;
  const { userData, setUserData } = useAdminStore();
  const { fetchLojas, fetchCargos, fetchBancos, fetchUsuario } = useAdminStore();
  const lojas = useAdminStore((s) => s?.lojas);

  const TOTAL_STEPS = 3;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [indexForm, setIndexForm] = useState<number | undefined>();

  useEffect(() => {
    if (Number(indexForm) >= 0) fetchUsuario(userId);
  }, [indexForm])

  useEffect(() => {
    if (userId && indexForm === undefined) {
      fetchUsuario(userId);
      localStorage.setItem('data', userId);
    } else {
      localStorage.removeItem('data');
    }
    // retorna função de cleanup
    return () => {
      setUserData(undefined);
      localStorage.removeItem('data');
    };
  }, [userId, indexForm]);

  useEffect(() => {
    fetchLojas();
    fetchCargos();
    fetchBancos();
  }, [fetchLojas, fetchCargos, fetchBancos]);

  return (
    <div className="funcionario-container">
      <div className="card perfil">
        <Avatar />
        <p className="p1">{userData?.nome || '---'}</p>
        <div className="row-cargos">
          {userData?.cargos.map((cargo) => <Chip className="chip primary" label={cargo.cargo} key={cargo.id} />)}
        </div>
        <div className="row-cargos">
          {userData?.cargos.filter((e) => e.loja_id).map((cargo) => <Chip className="chip green" label={lojas.find(e => e.id === cargo.loja_id)?.nome || '---'} key={cargo.loja_id} />)}
        </div>
      </div>

      {Number(indexForm) >= 0
        ? <Form setCurrentStep={setCurrentStep} index={indexForm} setIndex={setIndexForm} />
        : <FormLeitura setIndexForm={setIndexForm} />
      }

      {/* {userData && <Form setCurrentStep={setCurrentStep} />} */}

      <FooterForm progress={{ numberOfSteps: 0, currentStep: 0 }} >
        <ButtonComponent
          label="Voltar"
          variant="text"
          size="large"
          startIcon={<HiArrowLeft />}
          onClick={() => route.back()}
        />
      </FooterForm>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as { userId: string };
  return { props: { userId } };
};