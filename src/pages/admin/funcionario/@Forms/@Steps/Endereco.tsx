import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormStep, { InputText } from '../form-step'
import NextButton from "../Buttons/NextButton";
import BackButton from "../Buttons/BackButton";
import ApiCepCorreios from "@/apis/apiCepCorreios";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
    values: ValuesEnderecoType
    onNext: (e: object) => void
    onBack: (e: object) => void
}

export type ValuesEnderecoType = {
    cep: string,
    logradouro: string
    numero: string
    unidade: string
    complemento: string
    cidade: string
    uf: string
    bairro: string
};

export default function Endereco({
    values,
    onNext,
    onBack,
}: PropsType) {
    const RULES = {
        cep: z.string(),
        logradouro: z.string(),
        numero: z.string(),
        unidade: z.string(),
        complemento: z.string(),
        cidade: z.string(),
        uf: z.string(),
        bairro: z.string(),
    } as const;

    const Form = useFormContext();
    const control = Form?.control;
    const error = Form?.formState.errors;
    console.log("Control: ", control, error);
    const [loading, setLoading] = useState<boolean>(false);
    
    const getCEP = async(e?: React.ChangeEvent<HTMLInputElement>) => {    
        setLoading(true);
        const value = e?.target.value
        console.log("Form: ", Form?.watch());
        if(value?.length === 8) {
            const data = await ApiCepCorreios(value);
            if(data) {
                values.bairro = data.bairro
                values.cep = data.cep
                values.logradouro = data.logradouro
                values.cidade = data.estado
                values.uf = data.uf
            }
            
        }
        setLoading(false)
    };

    return (
        <FormStep
            key="endereco"
            defaultValues={values}
            resolver={zodResolver(
                z.object(RULES),
            )}
            onSubmit={(value) => onNext(value)}
        >
            <h3 className="h3">Qual é o endereço do colaborador?</h3>
            <div className="form-content">

                <div className="form-row col2">
                    <InputText name='cep' label='CEP*' placeholder="00000-00" onBlur={getCEP} />
                    <InputText name="logradouro" label="Logradouro" placeholder="Logradouro" />
                </div>
                <div className="form-row col3">
                    <InputText name="numero" label="Numero" placeholder="Numero" />
                    <InputText name="unidade" label="Unidade" placeholder="Unidade" />
                    <InputText name="complemento" label="Complemento" placeholder="Complemento" />
                </div>
                <div className="form-row col3">
                    <InputText name="cidade" label="Cidade" placeholder="Cidade" />
                    <InputText name="uf" label="Estado" placeholder="Estado" />
                    <InputText name="bairro" label="Bairro" placeholder="Bairro" />
                </div>
            </div>
            <footer className="action-btns">
                <BackButton onBack={onBack} />
                <NextButton end />
            </footer>
        </FormStep>
    )
}