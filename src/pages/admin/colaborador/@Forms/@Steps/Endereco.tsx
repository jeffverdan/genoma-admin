import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from '../form-step'
import NextButton from "../Buttons/NextButton";
import BackButton from "../Buttons/BackButton";
import ApiCepCorreios from "@/apis/apiCepCorreios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";

type PropsType = {
    values: ValuesEnderecoType
    onNext: (e: object) => void
    onBack?: (e: object) => void
    setIndex?: (e: undefined) => void // VOLTAR DO MODO DE EDIÇÃO
}

export type ValuesEnderecoType = {
    cep: string,
    logradouro: string
    numero: string | undefined
    unidade: string | undefined
    complemento: string | undefined
    cidade: string
    estado: string
    bairro: string
};

export default function Endereco({
    values,
    onNext,
    onBack,
    setIndex
}: PropsType) {
    const RULES = {
        cep: z.string(),
        logradouro: z.string(),
        numero: z.string().optional(),
        unidade: z.string().optional(),
        complemento: z.string().optional(),
        cidade: z.string(),
        estado: z.string(),
        bairro: z.string(),
    } as const;

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm({
        values,
        resolver: zodResolver(z.object(RULES)),
    });

    const getCEP = async (e?: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const cep = e?.target.value
        // console.log("Form: ", Form?.watch());
        const { setValue } = form;
        if (cep && cep.length >= 8) {
            const data = await ApiCepCorreios(cep);
            if (data) {
                setValue('cep', data.cep);
                setValue('logradouro', data.logradouro);
                setValue('cidade', data.localidade);
                setValue('estado', data.uf);
                setValue('bairro', data.bairro);
                // setValue('unidade', data.unidade);
                // setValue('complemento', data.complemento);                
            }
        } else if (!cep) {
            setValue('logradouro', '');
            setValue('cidade', '');
            setValue('estado', '');
            setValue('bairro', '');
        }
        setLoading(false)
    };

    return (
        <form
            onSubmit={form.handleSubmit((value) => onNext(value))}
            className="form-container"
            inert={false}
        >
            <FormProvider {...form}>
                <h3 className="h3">Qual é o endereço do colaborador?</h3>
                <div className="form-content">

                    <div className="form-row col2">
                        <InputText name='cep' label='CEP*' placeholder="00000-00" onBlur={getCEP} iconBefore={loading ? <CircularProgress size={20} /> : undefined} />
                        <InputText name="logradouro" disabled label="Logradouro" placeholder="Logradouro" />
                    </div>
                    <div className="form-row col3">
                        <InputText name="numero" label="Numero" placeholder="Numero" />
                        <InputText name="unidade" label="Unidade" placeholder="Unidade" />
                        <InputText name="complemento" label="Complemento" placeholder="Complemento" />
                    </div>
                    <div className="form-row col3">
                        <InputText name="cidade" disabled label="Cidade" placeholder="Cidade" />
                        <InputText name="estado" disabled label="Estado" placeholder="Estado" />
                        <InputText name="bairro" disabled label="Bairro" placeholder="Bairro" />
                    </div>
                </div>
                <footer className="action-btns">
                    {(setIndex || onBack) ? <BackButton setIndex={setIndex} onBack={onBack}  /> : <div></div>}                
                    <NextButton end />
                </footer>
            </FormProvider>
        </form>
    )
}