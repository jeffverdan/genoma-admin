import axios from 'axios';

const axiosInterceptorInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SAFEBOX_API_V1, // Replace with your API base URL
});

// Response interceptor
let isRedirecting = false;

axiosInterceptorInstance.interceptors.response.use(response => {
    if (response !== undefined && response?.data.status === 200 && response?.data.success === false) {

        const originalReq = response.config;
        // console.log("novo token = ", response?.data.token);
        localStorage.setItem('token', response?.data.token);
        // originalReq._retry = true;
        originalReq.headers["Authorization"] = `Bearer ${response?.data.token}`;
        // console.log(originalReq);
        return axiosInterceptorInstance(originalReq);
    }
    console.log('ok', response);
    return response
}, err => {
    console.log(err);
    if (!err.response) {
        alert("Não foi possível se conectar ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.");
        return Promise.reject(err);
    }

    const status = err.response.status;
    const message = err.response.data?.message || "Erro desconhecido";

    //  tratando erro
    if (!isRedirecting) {

        if (status === 401 || status === 498 || message === "The token has been blacklisted") {
            isRedirecting = true;
            if(message === "The token has been blacklisted"){
                alert('Token expirado. A página será recarregada.');
                window.location.reload();
                return;
            }else{
                 alert(`Erro de autenticação: ${message}`);
            }
            localStorage.clear();
            window.location.href = "/"; // redireciona para login
            return;
        } else if (status >= 500) {
            alert(`Erro interno no servidor. ${message}`);
        } else {
            alert(`Erro: ${message}`);
        }

        return Promise.reject(err);
    }
   
    return;
});
// End of Response interceptor

export default axiosInterceptorInstance;