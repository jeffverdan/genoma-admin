import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormStep, { InputText } from '../form-step'
import NextButton from "../Buttons/NextButton";
import BackButton from "../Buttons/BackButton";
import { InputSelect } from "../form-step";

type PropsType = {
    values: ValuesDadosPagamentoType
    onNext: (e: object) => void
    onBack: (e: object) => void
}

export type ValuesDadosPagamentoType = {
    banco: string,
    agencia: string,
    conta: string,
    tipo_pix: number,
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
        banco: z.string(),
        agencia: z.string(),
        conta: z.string(),
        tipo_pix: z.number(),
        chave_pix: z.string(),
    } as const;

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
                    <InputText name="banco" label="Instituição financeira" placeholder="000.000.000-00" />
                    <InputText name="agencia" label="Agência" placeholder="00000-0" />
                    <InputText name="conta" label="Conta" placeholder="(21) 00000-0000" />
                </div>
                <p className="p1">Pix</p>
                <div className="form-row col2">
                    <InputSelect name='tipo_pix' label='Tipo de Chave*' option={TEST_ARRY} />
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