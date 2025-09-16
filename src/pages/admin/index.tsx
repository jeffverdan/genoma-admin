import HeadSeo from "@/components/HeadSeo/HeadSeo"
import { useEffect } from "react";
import MenuLateral from "./@componentes/MenuLateral";
import Dashboard from "./@componentes/Dashboard/Dashboard";
import useAdminStore from "../../stores/admin/useAdminStore";
import Colaboradores from "./@componentes/Colaboradores/Colaboradores";
import { useRouter } from "next/router";

export default function Admin() {
    const router = useRouter();
    const { selectedIndex, fetchLojas, fetchUsuarios, fetchCargos } = useAdminStore();

    // 🔹 Primeiro: valida e salva o token
    useEffect(() => {
      if (!router.isReady) return;
  
      const tokenAtivo = localStorage.getItem("token");
  
      if (!tokenAtivo && router.query.token) {
        const {
          token,
          usuario_id,
          nome_usuario,
          usuario_email,
          perfil_login,
          perfis_usuario,
          lojas_usuario,
          empresa_loja,
        } = router.query;
  
        if (token) {
          // Salva no localStorage
          localStorage.setItem("token", String(token));
          localStorage.setItem("usuario_id", String(usuario_id));
          localStorage.setItem("nome_usuario", String(nome_usuario));
          localStorage.setItem("usuario_email", String(usuario_email));
          localStorage.setItem("perfil_login", String(perfil_login));
          localStorage.setItem("perfis_usuario", String(perfis_usuario));
          localStorage.setItem("lojas_usuario", String(lojas_usuario));
          localStorage.setItem("empresa_loja", String(empresa_loja));
  
          // Recarrega a rota sem query string
          router.replace("/admin");
        }
      }
    }, [router.isReady, router.query, router]);
  
    // 🔹 Segundo: faz os fetchs somente quando já tiver token
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        fetchLojas();
        fetchUsuarios();
        fetchCargos();
      }
    }, [fetchLojas, fetchUsuarios, fetchCargos]);

    return (
        <>
            <HeadSeo title="Admin Page" description="This is the admin page." />
            <main className="admin-container">

                <MenuLateral />

                {selectedIndex === 0 && <Dashboard />}

                {selectedIndex === 4 && <Colaboradores />}
            </main>
        </>
    );
}