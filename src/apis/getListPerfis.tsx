import axiosInstance from '../utils/axiosInterceptorInstance';

export type ListCargosType = {
  value: number
  name: string
}[]

type ResponseType = [
  {
    "id": 1,
    "nome": "Admin",
    "loja": null
  },
  {
    "id": 2,
    "nome": "Pós-venda",
    "loja": null
  },
  {
    "id": 3,
    "nome": "Gerente",
    "loja": null
  },
  {
    "id": 4,
    "nome": "Gerente Geral",
    "loja": null
  },
  {
    "id": 5,
    "nome": "Diretor Comercial",
    "loja": null
  },
  {
    "id": 6,
    "nome": "Núcleo",
    "loja": null
  },
  {
    "id": 7,
    "nome": "Corretor",
    "loja": null
  },
  {
    "id": 8,
    "nome": "Apoio",
    "loja": null
  },
  {
    "id": 9,
    "nome": "Financeiro",
    "loja": null
  },
  {
    "id": 10,
    "nome": "Coordenadora de Pós-Negociação",
    "loja": null
  }
]

async function getListPerfis() {
  let cargos;
  try {
    const res = await axiosInstance.get('listar_perfis', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    if (res) {
      cargos = (res.data.data as ResponseType).map((e) => ({value: e.id, name: e.nome})) as ListCargosType
    }
  } catch (error) {
    console.error('listar_perfis: ', error);
  }

  return cargos;
};

export default getListPerfis;