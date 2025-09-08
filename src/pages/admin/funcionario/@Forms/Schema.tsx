// schema.tsx
import type { Schema, Form, Return } from "@formity/react";
import DadosGerais, { type ValuesDadosGeraisType } from "./Steps/DadosGerais";
import Lojas, { type ValuesLojasType } from "./Steps/Lojas";
import DadosPagamento, { type ValuesDadosPagamentoType } from "./Steps/DadosPagamentos";
import Endereco, { type ValuesEnderecoType } from "./Steps/Endereco";
import { MultiStep } from "./multi-step";
import type { FormityStatus } from "./multi-step";

export type Values = [
    Form<ValuesDadosGeraisType>,
    Form<ValuesLojasType>,
    Form<ValuesDadosPagamentoType>,
    Form<ValuesEnderecoType>,
    Return<object>,
];

export type Params = {
    status: FormityStatus;
    onSave: (index: number, callback: (values: object) => void) => (values: object) => void;
};

type RenderType = {
    inputs: object;
    values: ValuesDadosGeraisType & ValuesLojasType & ValuesDadosPagamentoType & ValuesEnderecoType;
    params: Params;
    onNext: (e: object) => void;
    onBack: (e: object) => void | undefined;
}

const steps = [
    {
      id: "dados",
      Component: DadosGerais,
      values: () => ({
        name: ["Jeff", []],
        cpf: ["", []],
        creci: ["", []],
        telefone: ["", []],
        razao_social: ["", []],
        cnpj: ["", []],
      }),
    },
    {
      id: "lojas",
      Component: Lojas,
      values: () => ({
        loja: [0, []],
      }),
    },
    {
      id: "dadosPagamento",
      Component: DadosPagamento,
      values: () => ({
        banco: ["", []],
        agencia: ["", []],
        conta: ["", []],
        tipo_pix: [0, []],
        chave_pix: ["", []],
      }),
    },
    {
      id: "endereco",
      Component: Endereco,
      values: () => ({
        cep: ["", []],
        logradouro: ["", []],
        numero: ["", []],
        unidade: ["", []],
        complemento: ["", []],
        cidade: ["", []],
        uf: ["", []],
        bairro: ["", []],
      }),
    },
  ];

  export const schema = [
    ...steps.map((step, index) => ({
      form: {
        values: step.values,
        render: ({ values, params, onNext, onBack }: RenderType) => (
          <MultiStep id={step.id} onNext={onNext} onBack={onBack} status={params.status}>
            <step.Component
              values={values}
              onNext={params.onSave(index + 1, onNext)}
              onBack={params.onSave(index - 1, onBack)}
            />
          </MultiStep>
        ),
      },
    })),
    {
      return: (value: object) => value,
    },
  ] as unknown as Schema<Values, object, Params>; 

// export const schema: Schema<Values, object, Params> = [
//     {
//         form: {
//             values: () => ({
//                 name: ["Jeff", []],
//                 cpf: ["", []],
//                 creci: ["", []],
//                 telefone: ["", []],
//                 razao_social: ["", []],
//                 cnpj: ["", []],
//             }),
//             render: ({ values, params, onNext, onBack }) => (
                
//                     <MultiStep
//                         id="dados"
//                         onNext={onNext}
//                         onBack={onBack}
//                         status={params.status}
//                     >
//                         <DadosGerais
//                             values={values}
//                             onNext={params.onSave(1, onNext)}
//                         />
//                     </MultiStep>
                
//             ),
//         },
//     },
//     {
//         form: {
//             values: () => ({
//                 loja: [0, []],
//             }),
//             render: ({ values, params, onNext, onBack }) => (
//                     <MultiStep
//                         id="lojas"
//                         onNext={onNext}
//                         onBack={onBack}
//                         status={params.status}
//                     >
//                         <Lojas
//                             values={values}
//                             onNext={params.onSave(2, onNext)}                       
//                             onBack={params.onSave(0, onBack)}
//                         />
//                     </MultiStep>
//             ),
//         },
//     },
//     {
//         form: {
//             values: () => ({
//                 banco: ["", []],
//                 agencia: ["", []],
//                 conta: ["", []],
//                 tipo_pix: [0, []],
//                 chave_pix: ["", []],
//             }),
//             render: ({ values, params, onNext, onBack }) => (
//                     <MultiStep
//                         id="dadosPagamento"
//                         onNext={onNext}
//                         onBack={onBack}
//                         status={params.status}
//                     >
//                         <DadosPagamento
//                             values={values}
//                             onNext={params.onSave(3, onNext)}                            
//                             onBack={params.onSave(1, onBack)}
//                         />
//                     </MultiStep>
//             ),
//         },
//     },
//     {
//         return: (value) => (value),
//     },

// ];