import axiosInstance from '../utils/axiosInterceptorInstance';

export type UserDataColaboradorType = {
    "usuario_id": number | null,
    "nome": string | null,
    "email": string | null,
    "cpf": string | null,
    "cnpj": string | null,
    "nome_empresa": string | null,
    "ddi": string,
    "telefone": string,
    "cep": string | null,
    "logradouro": string | null,
    "numero": string | null,
    "unidade": string | null,
    "complemento": string | null,
    "cidade": string | null,
    "estado": string | null,
    "bairro": string | null,
    "creci": string | null,
    "dados_bancarios": {
        "id": number | null,
        "banco_id"?: number | null,
        "nome_banco"?: string | null,
        "agencia"?: string | null,
        "numero_conta"?: string | null,
        "tipo_chave_pix_id"?: number | null,
        "tipo_chave_pix"?: string | null,
        "pix"?: string | null
    },
    "lojas": {
        "id": number | null,
        "loja_id": number | null,
        "nome": string | null,
    }[],
    "cargos": {
        "id": number | null,
        "perfil_login_id": number | null,
        "cargo": string | null,
        "usuario_situacao": 0 | 1,
        "loja_id": number | null,
    }[]
};

async function getUserById(usuario_id: string): Promise<UserDataColaboradorType | undefined> {
    let lojas;
    try {
        const res = await axiosInstance.get('retornar_dados_colaborador', {
            params: {
                usuario_id
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        if (res) {
            lojas = res.data as UserDataColaboradorType;
        }
    } catch (error) {
        console.error('listar_lojas: ', error);
    }

    return lojas;
};

export default getUserById;