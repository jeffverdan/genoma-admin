import { zodResolver } from "@hookform/resolvers/zod";
import { nullable, z } from "zod";
import { InputSelect } from "../form-step";
import BackButton from "../Buttons/BackButton";
import NextButton from "../Buttons/NextButton";
import { useEffect, useState } from "react";
import useAdminStore from "@/stores/admin/useAdminStore";
import { FormProvider, useForm } from "react-hook-form";

export type ValuesLojasType = {
  quant_cargos: number
  cargos: {    
    id: number | null
    perfil_login_id: number ,
    loja_id: number 
  }[]
};

type PropsType = {
  values: ValuesLojasType
  onNext: (e: object) => void
  onBack?: (e: object) => void
  setIndex?: (e: undefined) => void // VOLTAR DO MODO DE EDIÇÃO
}

export default function Lojas({ values, onNext, onBack, setIndex }: PropsType) {
  const RULES = {
    quant_cargos: z
    .number()
    .min(1, "Selecione ao menos 1 cargo")
    .max(10, "Máximo de 10 cargos"), // opcional limite
    
    cargos: z.array(
      z.object({
        id: z.number().nullable(),
        perfil_login_id: z.number().min(1, "Selecione um cargo válido"),
        loja_id: z.number().min(1, "Selecione uma loja válida"),
      })
    )
  } as const;

  const lojas = useAdminStore((s) => s?.lojas);
  const cargos = useAdminStore((s) => s?.cargos);
  const [ listQuant, setListQuant ] = useState([{ value: 0, name: "Selecione"}]);

  useEffect(() => {
    attQuantList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attQuantList = () => {
    const quant = watch('cargos').length
    const quantArray = Array.from({ length: quant + 2 }, (_e, index) => ({
      value: index + 1,
      name: (index + 1).toString()
    }));

    setListQuant(quantArray);
  };

  const form = useForm({
    values,
    resolver: zodResolver(z.object(RULES)),
  });
  const { watch, setValue } = form;

  if(form) {
    console.log("Watch: ", watch('cargos'));
    console.log("Values: ", values?.cargos);
    console.log("Errors: ", form.formState.errors);
  }

  useEffect(() => {
    const quant = watch("quant_cargos");
    const oldCargos = watch("cargos");
    if (quant && quant > 0) {
      // cria um array com `quant` elementos
      const cargosArray = Array.from({ length: quant }, (_e, index) => ({
        id: oldCargos[index]?.id || null,
        perfil_login_id: oldCargos[index]?.perfil_login_id,
        loja_id: oldCargos[index]?.loja_id
      }));
  
      setValue("cargos", cargosArray);
      attQuantList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("quant_cargos")]);

  return <form
    onSubmit={form.handleSubmit((value) => onNext(value))}
    className="form-container"
    inert={false}
  >
    <FormProvider {...form}>
      <h3 className="h3">Cargos designados ao colaborador</h3>
      <div className="form-content dados-funcionario">
        <p>Quantos cargos esse colaborador ocupa na empresa?</p>
        <InputSelect
          name='quant_cargos'
          label='Quantidade de cargos*'
          option={listQuant}
        />
        <p>Selecione o cargo e as lojas do colaborador</p>
        {watch("cargos")?.map((cargo, index) => (
          <div className="form-row col2" key={index}>            
            <InputSelect name={`cargos.${index}.perfil_login_id`} label='Cargo*' option={cargos} />
            <InputSelect name={`cargos.${index}.loja_id`} label='Loja*' option={lojas} />
          </div>
        ))}
      </div>

      <footer className="action-btns">
        {(setIndex || onBack) ? <BackButton setIndex={setIndex} onBack={onBack}  /> : <div></div>}                
        <NextButton />
      </footer>
    </FormProvider>
  </form>
}