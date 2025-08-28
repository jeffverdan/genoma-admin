type GetLojasResType = {
    "id": number,
    "nome": string,
    "label": string,
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

export type { GetLojasResType };