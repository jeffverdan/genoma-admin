import Image from "next/image";
import LogoEmpresa from '@/images/logoEmpresa.png';
import LojasImage from '@/images/ilustra_lojas.png';
import FuncionariosImage from '@/images/ilustra_funcionarios.png';
import useAdminStore from "../../@store/useAdminStore";

const EMPRESA = {
    id: 0,
    nome: "DNA IMÓVEIS",
}

export default function Dashboard() {    
    const lojas = useAdminStore((s) => s.lojas);
    const usuarios = useAdminStore((s) => s.usuarios);

    return (
        <section className="dashboard-admin">

            <div className="cards-container">
                <div className="card empresa">
                    <Image src={LogoEmpresa} alt="Logo da Empresa" height={106} />
                    <p className="p1">{EMPRESA.nome}</p>

                </div>

                <div className="card">
                    <Image src={LojasImage} alt="Ilustração de Lojas" height={104} />
                    <h1 className="h1">{lojas.length}</h1>
                    <p className="p1">Lojas</p>
                </div>

                <div className="card">
                    <Image src={FuncionariosImage} alt="Logo da Empresa" height={106} />
                    <h1 className="h1">{usuarios.length}</h1>
                    <h2>Funcionários</h2>
                </div>
            </div>

        </section>
    );
}