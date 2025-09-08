import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormStep, InputText } from '../form-step'
import { NextButton } from "../Buttons/NextButton";
import { BackButton } from "../Buttons/BackButton";

type PropsType = {
    values: ValuesDadosGeraisType
    onNext: (e: object) => void
}

export type ValuesDadosGeraisType = {
    name: string,
    cpf: string,
    creci: string,
    telefone: string,
    razao_social: string,
    cnpj: string
};

export default function DadosGerais({ values, onNext }: PropsType) {
    const RULES = {
        name: z.string().min(1, { message: "Required" }),
        cpf: z.string().min(1, { message: "Required" }),
        creci: z.string().min(1, { message: "Required" }),
        telefone: z.string().min(1, { message: "Required" }),
        razao_social: z.string(),
        cnpj: z.string(),
    } as const;

    return (
        <FormStep
            key="dadosGerais"
            defaultValues={values}
            resolver={zodResolver(
                z.object(RULES),
            )}
            onSubmit={(value) => onNext(value)}
        >
            <h3 className="h3">Insira os dados gerais do colaborador:</h3>
            <div className="form-content dados-funcionario">
                <InputText name="name" label="Nome Completo*" placeholder="Digite o nome aqui..." />

                <div className="form-row col3">
                    <InputText name="cpf" label="CPF*" placeholder="000.000.000-00" />
                    <InputText name="creci" label="CRECI*" placeholder="00000-0" />
                    <InputText name="telefone" label="Telefone/Celular" placeholder="(21) 00000-0000" />
                </div>

                <p className="p1">Dados de pessoa jurídica</p>
                <InputText name="razao_social" label="Razão social" placeholder="Digite aqui..." />
                <InputText name="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" />
            </div>
            <footer className="action-btns">
                <div></div>
                <NextButton />
            </footer>
        </FormStep>
    )
}