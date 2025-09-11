import axiosInstance from '../utils/axiosInterceptorInstance';
import { UserDataColaboradorType } from './gerUserById';

async function saveUser(dataToSave: UserDataColaboradorType): Promise<{ status: boolean } | undefined> {
    let response;
    try {
        const res = await axiosInstance.post('salvar_colaborador', {
            ...dataToSave
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        if (res) {
            response = res.data;
        }
    } catch (error) {
        console.error('listar_lojas: ', error);
    }

    return response;
};

export default saveUser;