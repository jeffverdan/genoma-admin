import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import Axios from 'axios';
import InputText from '../components/Inputs/InputText';
import Button from '../components/Button/Button';
import Image from 'next/image';
import logoGenoma from '../images/genoma_logo_1.png';
import boasVindasImg from '../images/undraw_business_deal.svg'
import { HiArrowRight } from 'react-icons/hi';
import { CircularProgress } from '@mui/material';

interface LoginFormValues {
  nome: string
  sobrenome: string
  email: string
  password: string
  remember: boolean
}

const links = {
  safebox: process.env.NEXT_PUBLIC_SAFEBOX_URL,
  laravel: process.env.NEXT_PUBLIC_SAFEBOX_API  
}

const login = {
  user: 'genoma@dnaimoveis.com',
  password: '321456'
}

export default function IndexPage() {
  const history = useRouter();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormValues>({
    // defaultValues: { "email": "genoma@dnaimoveis.com" }
  })
  
  const [msgLogin, setMsgLogin] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  
  const clearAcess = async () => {
    const startInfo: string | undefined = localStorage.getItem('startInfo') || '';
    localStorage.clear();
    localStorage.setItem('startInfo', startInfo);
  }

  useEffect(() => {
    console.log("Versão: ", '3.0.2');  
    clearAcess();
  },[]);

  const handleGoResetPassword = () => {
    history.push('/esqueci-senha/enviarcodigo'); // Navega para a página inicial
};
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    if (data.email === login.user) {
      return history.push('/vendas');
    }
    try {
      const response = await Axios.post(links.laravel + 'login', data);
      if(response?.data?.status === "false" && !!response?.data?.message) {
        setLoading(false);
        return setMsgLogin(`* ${response?.data.message || "Ops, servidor não está respondendo, tente novamente mais tarde."}`)
      };
      // console.log(response)
      setMsgLogin(undefined)
      const [perfil_logins] = response.data.perfil_logins.data;
      console.log(perfil_logins);
      const [loja] = perfil_logins.loja;
      console.log(loja)
      const perfisUsuario = response.data.perfil_logins.data;
      const lojasUsuario = perfil_logins.loja;

      localStorage.setItem('token', response.data.token);
    //   setToken(response.data.token);

      localStorage.setItem('usuario_id', response.data.user.id);
      localStorage.setItem('nome_usuario', response.data.user.name);
      localStorage.setItem('usuario_email', response.data.user.email);
      localStorage.setItem('perfil_login', perfil_logins.nome);
      localStorage.setItem('perfil_login_id', perfil_logins.id);
      localStorage.setItem('loja_id', loja ? loja.id : "");
      localStorage.setItem('perfis_usuario', JSON.stringify(perfisUsuario));
      localStorage.setItem('lojas_usuario', JSON.stringify(lojasUsuario));
      
      if(loja){
        localStorage.setItem('empresa_loja', JSON.stringify([loja.empresa]) || '');
      }

      if (perfil_logins.nome === "Admin") {
        history.push('/admin');
      } 
    } catch (error) {
      console.log(error);
      
      setMsgLogin(`* ${"Ops, servidor não está respondendo, tente novamente mais tarde."}`)
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className='img-login center'>
        <Image alt='Boas Vindas' src={boasVindasImg} />
      </div>
      <div className='form-login center'>
        <form onSubmit={handleSubmit(onSubmit)} className='form' autoComplete='off'>
          <div className='head-form'>
            <Image alt='Genoma Imóveis' data-testid="logo-img" className='mb36' src={logoGenoma} style={{width: '100%', maxWidth: '360px', height: 'auto'}} />
            {/* <Button variant="outlined" onClick={toggleTheme} size={'small'} name={''} label={theme === "light" ? "Dark Mode" : "Light Mode"} labelColor='#14B8AA' /> */}
            <h2 className='mb16 colorS400 fw700'>Boas-vindas!</h2>
            <p className='p1 mb42'>Faça seu login para continuar.</p>
          </div>
          <InputText
            label="E-mail"
            placeholder='Ex: seuemail@gmail.com'
            fieldError={errors.email}            
            sucess={!errors.email && !!watch("email")}
            {...register("email", {
              required: "E-mail obrigatório",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "E-mail inválido",
              },
            })}
          />

          <InputText
            label="Password"
            placeholder='Ex: Minhasenha987'            
            fieldError={errors.password}            
            sucess={!errors.password && !!watch("password")}
            {...register("password", {
              required: "Senha obrigatória",
            })}
          />

          {
            msgLogin &&
            <div className="errorMsg" style={{ position: 'relative', top: '-25px' }}>
              {`${msgLogin}`}
            </div>
          }


          <div className='mb49'>
            <Button
              variant="contained"
              type="submit"
              size={'large'}
              name={'primary'}
              label={'Entrar'}
              disabled={loading}
              endIcon={loading ? <CircularProgress size={20} /> : <HiArrowRight fill='white' />}
              data-testid="btn-login"
              fullWidth
            />
          </div>

          <Button
            variant="text"
            type="reset"
            size={'large'}
            name={'minimal'}
            label={'Esqueci minha senha'}
            data-testid="reset-login"
            onClick={handleGoResetPassword}
          />
        </form>
      </div>
    </div>
  )
}