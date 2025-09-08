import { GetUsersListType } from '@/types/APIs';
import axiosInstance from '../utils/axiosInterceptorInstance';

async function getUsuarios(processoId?: number,  tipoUsuario?: string): Promise<GetUsersListType[] | undefined>{
    let data;
    
    await axiosInstance.post('listar_usuarios', {
            'processo_id': processoId,
            'tipoUsuario': tipoUsuario
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res => {
            console.log("Usuerios: ", res.data.usuarios);            
            data = res.data.usuarios.filter((user: {name: string}) => user.name) as GetUsersListType[];
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    return data;
}

export default getUsuarios;