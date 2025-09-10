import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormStep, { InputText } from '../form-step'
import NextButton from "../Buttons/NextButton";
import { UserDataColaboradorType } from "@/apis/gerUserById";

type PropsType = {
    values: ValuesDadosGeraisType
    onNext: (e: ValuesDadosGeraisType) => void
}

export type ValuesDadosGeraisType = {
    nome: string,
    email: string,
    cpf: string,
    creci: string,
    telefone: string,
    nome_empresa: string,
    cnpj: string
};

export const RULES_DADOS_GERAIS = {
    nome: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Required" }),
    cpf: z.string().min(1, { message: "Required" }),
    creci: z.string().min(1, { message: "Required" }),
    telefone: z.string().min(1, { message: "Required" }),
    nome_empresa: z.string(),
    cnpj: z.string(),
} as const;

export default function DadosGerais({ values, onNext }: PropsType) {
    console.log("Values: ", values);
    
    return (
        <FormStep
            key="dadosGerais"
            defaultValues={values}
            resolver={zodResolver(
                z.object(RULES_DADOS_GERAIS),
            )}
            onSubmit={(value) => onNext(value)}
        >
            <h3 className="h3">Insira os dados gerais do colaborador:</h3>
            <div className="form-content dados-funcionario">
                <div className="form-row col2">
                    <InputText name="nome" label="Nome Completo*" placeholder="Digite o nome aqui..." />
                    <InputText name="email" label="Email*" placeholder="Digite o email aqui..." />
                </div>

                <div className="form-row col3">
                    <InputText name="cpf" label="CPF*" placeholder="000.000.000-00" />
                    <InputText name="creci" label="CRECI*" placeholder="00000-0" />
                    <InputText name="telefone" label="Telefone/Celular" placeholder="(21) 00000-0000" />
                </div>

                <p className="p1">Dados de pessoa jurídica</p>
                <InputText name="nome_empresa" label="Razão social" placeholder="Digite aqui..." />
                <InputText name="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" />
            </div>
            <footer className="action-btns">
                <div></div>
                <NextButton />
            </footer>
        </FormStep>
    )
}