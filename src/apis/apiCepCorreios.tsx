import Axios from 'axios'

type ResponseAPI = {
    "cep": string,
    "logradouro": string,
    "complemento": string | "",
    "unidade": string | "",
    "bairro": string,
    "localidade": string,
    "uf": string,
    "estado": string,
    "regiao": string,
    "ibge": string,
    "gia": string | "",
    "ddd": string,
    "siafi": string
}

async function ApiCepCorreios(cep: string): Promise<ResponseAPI | undefined>{    
    let value:undefined;

    await Axios.get('https://viacep.com.br/ws/' + cep + '/json/')
    .then(res => {
        console.log(res.data);
        value = res.data;
    })

    .catch(error => {
        console.log(error);
    })

    console.log('Seu CEP: ' , value);
    return value;
}

export default ApiCepCorreios;