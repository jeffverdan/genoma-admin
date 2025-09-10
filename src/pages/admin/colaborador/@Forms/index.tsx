// app.tsx
import { useCallback, useEffect, useState } from "react";
import { Formity, type OnReturn, type Schema } from "@formity/react";
import { schema as defaultSchema, type Values, type Params, FormColaboradoresDataType } from "./@Steps/@Schema";
import type { Status } from "./multi-step";
import { UserDataColaboradorType } from "@/apis/gerUserById";
import saveUser from "@/apis/postSaveUser";
import { ValuesDadosGeraisType } from "./@Steps/DadosGerais";
import { ValuesLojasType } from "./@Steps/Lojas";
import { ValuesDadosPagamentoType } from "./@Steps/DadosPagamentos";
import { ValuesEnderecoType } from "./@Steps/Endereco";
import useAdminStore from "@/stores/admin/useAdminStore";

type FormPropsType = {
  setCurrentStep: (e: number) => void
}


export default function Form({ setCurrentStep }: FormPropsType) {
  const [schema, setSchema] = useState<Schema<Values, object, Params>>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({
    type: "formity",
    moving: false,
    submitting: false,
  });
  const { userData, setUserData } = useAdminStore();
  const { fetchLojas, fetchCargos } = useAdminStore();
  const cargos = useAdminStore((s) => s.cargos);
  useEffect(() => {
    fetchLojas();
    fetchCargos();
  }, [fetchLojas, fetchCargos]);

  useEffect(() => {
    const newSchema = defaultSchema(userData);
    setSchema(newSchema);
  }, [userData]);

  console.log("State Schema: ", schema);

  // CHAMA APENAS NO ULTIMO STEP
  const onReturn = useCallback<OnReturn<Values>>(async (output) => {
    // setStatus({ type: "formity", moving: false, submitting: true });
    const values = output as FormColaboradoresDataType;

    // Show output in the console
    console.log("Saida: ", userData);
    
    const DADOS_BANCARIOS = userData?.dados_bancarios;
    
    const dataToSave = {
      ...userData,
      ...output,
      dados_bancarios: {        
        ...DADOS_BANCARIOS,
          "id": DADOS_BANCARIOS?.id || null,  
          "banco_id": values.banco_id || null,          
          "agencia": values.agencia || '',
          "numero_conta": values.numero_conta || '',
          "tipo_chave_pix_id": values.tipo_chave_pix_id || null,          
          "pix": values.chave_pix || '',      
      }
    } as UserDataColaboradorType;

    // Simulate a network request
    const res = await saveUser(dataToSave)

    // setStatus({ type: "end" });
  }, []);



  if (status.type === "end") {
    return (
      <>

      </>
    );
  };

  const onSave = (index: number, callback: (values: object | FormColaboradoresDataType) => void) => (values: object | FormColaboradoresDataType) => {
    console.log("Step: ", index);
    console.log("Form to Save: ", values);

    let DADOS_CARGOS = userData?.cargos || [];
    let DADOS_BANCARIOS = userData?.dados_bancarios;
    if("banco_id" in values) {
      const value = values as ValuesDadosPagamentoType;
      DADOS_BANCARIOS = {
        ...DADOS_BANCARIOS,
        ...value,
        id: DADOS_BANCARIOS?.id || null
      }
    } else if ("quant_cargos" in values) {
      const value = values as ValuesLojasType;
      DADOS_CARGOS = value.cargos.map((cargo, index) => ({
        ...DADOS_CARGOS[index],
        cargo: cargos.find((e) => e.value === cargo.perfil_login_id)?.name || '',
        loja_id: cargo.loja_id,
        perfil_login_id: cargo.perfil_login_id 
      }))
    }

    const attUserData = {
      ...userData,
      ...values,
      cargos: DADOS_CARGOS,
      dados_bancarios: {
        ...DADOS_BANCARIOS,
      }
    } as UserDataColaboradorType;

    setUserData(attUserData);
    callback(values);
    setCurrentStep(index);
  };

  console.log("User data: ", userData);
  

  return (
    <section className='formity-forms'>
      {schema && <Formity<Values, FormColaboradoresDataType, Params>
        schema={schema}
        params={{ status, onSave: onSave }}
        onReturn={onReturn}
      />}
    </section>
  );
}