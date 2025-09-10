import axiosInstance from '../utils/axiosInterceptorInstance';
import { GetLojasResType } from '../types/APIs/index';

async function getLojas() {
  let lojas;
  try {
    const res = await axiosInstance.get('listar_lojas', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    if (res) {
      lojas = res.data.data.map((e: GetLojasResType) => ({ ...e, value: e.id, name: e.nome }));
    }
  } catch (error) {
    console.error('listar_lojas: ', error);
  }

  return lojas as GetLojasResType[];
};

export default getLojas;