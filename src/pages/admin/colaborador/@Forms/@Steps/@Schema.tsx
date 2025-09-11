// schema.tsx
import type { Schema, Form, Return } from "@formity/react";
import DadosGerais, { type ValuesDadosGeraisType } from "./DadosGerais";
import Lojas, { type ValuesLojasType } from "./Lojas";
import DadosPagamento, { type ValuesDadosPagamentoType } from "./DadosPagamentos";
import Endereco, { type ValuesEnderecoType } from "./Endereco";
import MultiStep from "../@Animations/multi-step";
import type { FormityStatus } from "../@Animations/multi-step";
import { UserDataColaboradorType } from "@/apis/gerUserById";

export type Values = [
  Form<ValuesDadosGeraisType>,
  Form<ValuesLojasType>,
  Form<ValuesDadosPagamentoType>,
  Form<ValuesEnderecoType>,
  Return<object>,
];

export type FormColaboradoresDataType = ValuesDadosGeraisType & ValuesLojasType & ValuesDadosPagamentoType & ValuesEnderecoType;
export type Params = {
  status: FormityStatus;
  onSave: (index: number, callback: (values: object) => void) => (values: object) => void;
};

type RenderType = {
  inputs: object;
  values: FormColaboradoresDataType;
  params: Params;
  onNext: (e: object) => void;
  onBack: (e: object) => void | undefined;
}

const steps = (userData?: UserDataColaboradorType) => [
  {
    id: "dados",
    Component: DadosGerais,
    values: () => ({
      nome: [userData?.nome || "", []],
      email: [userData?.email || "", []],
      cpf: [userData?.cpf || "", []],
      creci: [userData?.creci || "", []],
      telefone: [userData?.telefone || "", []],
      nome_empresa: [userData?.nome_empresa || "", []],
      cnpj: [userData?.cnpj || "", []],
    }),
  },
  {
    id: "cargos",
    Component: Lojas,
    values: () => ({
      quant_cargos: [userData?.cargos?.length || null, []],
      cargos: [
        userData?.cargos.map((e) => ({
          id: e.id,
          perfil_login_id: e.perfil_login_id,
          loja_id: e.loja_id,
        })) || [
          {
            id: null,
            perfil_login_id: null,
            loja_id: null,
          },
        ],
        []]
    }),
  },
  {
    id: "dadosPagamento",
    Component: DadosPagamento,
    values: () => ({
      banco_id: [userData?.dados_bancarios?.banco_id || null, []],
      agencia: [userData?.dados_bancarios?.agencia || '', []],
      numero_conta: [userData?.dados_bancarios?.numero_conta || '', []],
      tipo_chave_pix_id: [userData?.dados_bancarios?.tipo_chave_pix_id || null, []],
      chave_pix: [userData?.dados_bancarios?.pix || '', []],
    }),
  },
  {
    id: "endereco",
    Component: Endereco,
    values: () => ({
      cep: [userData?.cep, []],
      logradouro: [userData?.logradouro, []],
      numero: [userData?.numero, []],
      unidade: [userData?.unidade, []],
      complemento: [userData?.complemento, []],
      cidade: [userData?.cidade, []],
      estado: [userData?.estado, []],
      bairro: [userData?.bairro, []],
    }),
  },
];

export const schema = (userData?: UserDataColaboradorType, setIndex?: (e: undefined) => void) => [
  ...steps(userData).map((step, index) => ({
    form: {
      values: step.values,
      render: ({ values, params, onNext, onBack }: RenderType) => (
        <MultiStep id={step.id} onNext={onNext} onBack={onBack} status={params.status}>
          <step.Component
            values={values}
            onNext={params.onSave(index + 1, onNext)}
            onBack={params.onSave(index - 1, onBack)}
            setIndex={setIndex}
          />
        </MultiStep>
      ),
    },
  })),
  {
    return: (value: FormColaboradoresDataType) => value,
  },
] as unknown as Schema<Values, object, Params>;

export default function Page() { return null }