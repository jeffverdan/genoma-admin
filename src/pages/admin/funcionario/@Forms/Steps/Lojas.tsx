import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormStep,
} from '../form-step';
import { InputSelect } from "../form-step";
import { BackButton } from "../Buttons/BackButton";
import { NextButton } from "../Buttons/NextButton";

export type ValuesLojasType = { loja: number };

type PropsType = {
  values: ValuesLojasType
  onNext: (e: object) => void
  onBack: (e: object) => void
}

const TEST_ARRY = [
  {value: 0, name: "Selecione..."},
  {value: 1, name: "Ipanema"},
  {value: 2, name: "Copacabana"},
]

export default function Lojas({ values, onNext, onBack }: PropsType) {
  const RULES = {
    loja: z.number().min(1, { message: "Required" }),
  } as const;

  return <FormStep
    key="loja"
    defaultValues={values}
    resolver={zodResolver(
      z.object(RULES),
    )}
    onSubmit={onNext}
  >
    <h3 className="h3">Em qual loja está alocado(a)?</h3>
    <InputSelect
      name='loja'
      label='Loja*'
      option={TEST_ARRY}
    />

    <footer className="action-btns">
      <BackButton onBack={onBack} />      
      <NextButton />
    </footer>

  </FormStep>
}