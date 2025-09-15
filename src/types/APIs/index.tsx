type GetLojasResType = {
    "id": number,
    "value": number,
    "nome": string,
    "name": string,
    "empresa": {
        "id": number,
        "nome_empresarial": string,
        "cnpj": string,
        "creci": string,
        "created_at": null,
        "updated_at": null,
        "verificar_franquia": 0 | 1
    }
}

type GetUsersListType = {
    "id": number,
    "name": string | null,
    "email": string | null,
    "email_verified_at": null,
    "telefone": string | null,
    "created_at": string,
    "updated_at": string,
    "endereco": null,
    "cpf_cnpj": string,
    "rg": string | null,
    "estado_civil": string | null,
    "data_nascimento": string | null,
    "nacionalidade": string | null,
    "tipo_pessoa": 0 | 1,
    "razao_social": string | null,
    "nome_fantasia": string | null,
    "nome_mae": string | null,
    "nome_pai": string | null,
    "profissao": string | null,
    "rg_expedido": string | null,
    "data_rg_expedido": string | null,
    "cep": string | null,
    "bairro": string | null,
    "logradouro": string | null,
    "numero": string | null,
    "unidade": string | null,
    "complemento": string | null,
    "cidade": string | null,
    "estado": string | null,
    "registro_casamento": string | null,
    "uniao_estavel": string | null,
    "conjuge": string | null,
    "genero": string | null,
    "ddi": string | null,
    "perfil_login_id": number,
    "perfil_login_nome": string,
    "usuario_situacao": 0 | 1,
    "loja_nome": string,
    "loja_id": number
    cargos: {
        "id": number,
        "perfil_login_id": number,
        "cargo": string,
        "usuario_situacao": 0 | 1,
        "loja_id": number
    }[],
    lojas: {        
        "loja_id": number,
        "loja_nome": string
    }[]
}

export type { GetLojasResType, GetUsersListType };