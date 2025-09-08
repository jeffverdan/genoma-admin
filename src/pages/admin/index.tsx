import HeadSeo from "@/components/HeadSeo/HeadSeo"
import { useEffect } from "react";
import MenuLateral from "./@componentes/MenuLateral";
import Dashboard from "./@componentes/Dashboard/Dashboard";
import useAdminStore from "../../stores/admin/useAdminStore";
import Colaboradores from "./@componentes/Colaboradores/Colaboradores";

export default function Admin() {
    const {
        selectedIndex,
        fetchLojas,
        fetchUsuarios,
      } = useAdminStore();
    
      useEffect(() => {
        fetchLojas();
        fetchUsuarios();
      }, [fetchLojas, fetchUsuarios]);

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