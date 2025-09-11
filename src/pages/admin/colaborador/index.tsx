import { Avatar, Chip } from "@mui/material";
import Form from './@Forms';
import FooterForm from '@/components/Footers/Form';
import { useEffect, useState } from "react";
import useAdminStore from "@/stores/admin/useAdminStore";

export default function FuncionarioById() {  
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const TOTAL_STEPS = 3;    
  const { userData, setUserData } = useAdminStore();  
  const { fetchLojas, fetchCargos, fetchBancos } = useAdminStore();
  useEffect(() => {
    fetchLojas();
    fetchCargos();
    fetchBancos();
  }, [fetchLojas, fetchCargos, fetchBancos]);

  const lojas = useAdminStore((s) => s?.lojas);

  useEffect(() => {
    localStorage.removeItem('data');
    // retorna função de cleanup
    return () => {
      setUserData(undefined);
      localStorage.removeItem('data');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <Form setCurrentStep={setCurrentStep} />

      <FooterForm progress={{ numberOfSteps: TOTAL_STEPS, currentStep: currentStep }} >
        <></>
      </FooterForm>
    </div>
  );
}