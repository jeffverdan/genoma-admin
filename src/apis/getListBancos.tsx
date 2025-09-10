import axiosInstance from '../utils/axiosInterceptorInstance';

type ResponseType = {
    data: { id: number, nome: string }[],
    msg: string
    status: boolean
}

export type ListBancosType = { value: number, name: string }[]

async function getListBancos(): Promise<ListBancosType | undefined> {
    let data;

    function capitalizeFirstWord(str: string | undefined): string {
        if (!str) return ""
        const words = str.toLowerCase().split(' ');
        const capitalizedWords = words.map(word => {
            if (word.length > 1) return word.charAt(0).toUpperCase() + word.slice(1)
            else return word.charAt(0) + word.slice(1)
        });
        return capitalizedWords.join(' ');
    };

    await axiosInstance.get('listbancos', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }).then((res: {data: ResponseType}) => {
        data = res.data?.data?.sort((a, b) => -b.nome?.localeCompare(a.nome));
        data?.forEach((e: { nome: string }) => e.nome = capitalizeFirstWord(e.nome.trim()))
        data = data?.sort((a, b) => -b.nome?.localeCompare(a.nome));
        
        data = data.map((item) => ({ value: item.id, name: item.nome }))
        console.log("List Bancos ", data);
    })
        .catch(err => {
            console.log(err);
        })
    return data;
}

export default getListBancos;