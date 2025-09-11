import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormStep, { InputText } from '../form-step'
import NextButton from "../Buttons/NextButton";
import BackButton from "../Buttons/BackButton";
import { InputSelect } from "../form-step";
import { useEffect, useState } from "react";
import getListBancos, { ListBancosType } from "@/apis/getListBancos";
import useAdminStore from "@/stores/admin/useAdminStore";

type PropsType = {
    values: ValuesDadosPagamentoType
    onNext: (e: ValuesDadosPagamentoType) => void
    onBack: (e: ValuesDadosPagamentoType) => void
}

export type ValuesDadosPagamentoType = {
    banco_id: number,
    agencia: string,
    numero_conta: string,
    tipo_chave_pix_id: number,
    chave_pix: string,
};

const TEST_ARRY = [
    { value: 0, name: "Selecione..." },
    { value: 1, name: "CPF" },
    { value: 2, name: "Telefone" },
    { value: 3, name: "Email" },
    { value: 4, name: "Chave Aleatória" },
];

export default function DadosPagamento({
    values,
    onNext,
    onBack,
}: PropsType) {
    const RULES = {
        banco_id: z.number(),
        agencia: z.string(),
        numero_conta: z.string(),
        tipo_chave_pix_id: z.number(),
        chave_pix: z.string(),
    } as const;

    const bancos = useAdminStore((s) => s?.bancos);

    return (
        <FormStep
            key="dadosPagamentos"
            defaultValues={values}
            resolver={zodResolver(
                z.object(RULES),
            )}
            onSubmit={(value) => onNext(value)}
        >
            <h3 className="h3">Insira os dados de pagamento</h3>
            <div className="form-content dados-funcionario">

                <p className="p1">Banco</p>
                <div className="form-row col3">
                    <InputSelect name='banco_id' label='Instituição financeira*' option={bancos} />
                    {/* <InputText name="banco" label="Instituição financeira" placeholder="000.000.000-00" /> */}
                    <InputText name="agencia" label="Agência" placeholder="00000-0" />
                    <InputText name="numero_conta" label="Conta" placeholder="(21) 00000-0000" />
                </div>
                <p className="p1">Pix</p>
                <div className="form-row col2">
                    <InputSelect name='tipo_chave_pix_id' label='Tipo de Chave*' option={TEST_ARRY} />
                    <InputText name="chave_pix" label="Chave Pix" placeholder="00.000.000/0000-00" />
                </div>
            </div>
            <footer className="action-btns">
                <BackButton onBack={onBack} />
                <NextButton />
            </footer>
        </FormStep>
    )
}