import ButtonComponent from "@/components/Button/Button";
import useAdminStore from "@/stores/admin/useAdminStore";
import { Chip } from "@mui/material";
import { HiPencil } from "react-icons/hi2";

interface PropsType {
    setIndexForm: (e: number) => void
}

export default function FormLeitura(props: PropsType) {
    const { userData, lojas } = useAdminStore();
    const { setIndexForm } = props;


    return <section className="formity-forms leitura">
        <div className="form-container dados-pessoais">
            <h3>Dados pessoais</h3>
            <div className="row">
                <div className="campo">
                    <p>Nome completo</p>
                    <span>{userData?.nome || '---'}</span>
                </div>
                <div className="campo">
                    <p>Email</p>
                    <span>{userData?.email || '---'}</span>
                </div>
            </div>

            <div className="row">
                <div className="campo">
                    <p>CPF</p>
                    <span>{userData?.cpf || '---'}</span>
                </div>

                <div className="campo">
                    <p>CRECI</p>
                    <span>{userData?.creci || '---'}</span>
                </div>

                <div className="campo">
                    <p>Telefone/celular</p>
                    <span>{userData?.telefone || '---'}</span>
                </div>
            </div>

            <h4>Dados de pessoa jurídica</h4>

            <div className="campo">
                <p>Razão social</p>
                <span>{userData?.nome_empresa || '---'}</span>
            </div>

            <div className="campo">
                <p>CNPJ</p>
                <span>{userData?.cnpj || '---'}</span>
            </div>

            <footer className="footer-action">
                <ButtonComponent
                    label="Editar"
                    variant="text"
                    size="large"
                    startIcon={<HiPencil />}
                    onClick={() => setIndexForm(0)}
                />
            </footer>
        </div>

        <div className="form-container cargos-lojas">
            <h3>Loja e cargo</h3>

            <div className="grid col2">
                <p>Cargo</p>
                <p>Loja</p>
                {userData?.cargos.map((cargo) => (<>
                    <Chip label={cargo.cargo} className="chip primary" />
                    {cargo.loja_id && <Chip label={lojas.find((e) => e.id === cargo.loja_id)?.name} className="chip green" />}
                </>))}
            </div>


            <footer className="footer-action">
                <ButtonComponent
                    label="Editar"
                    variant="text"
                    size="large"
                    startIcon={<HiPencil />}
                    onClick={() => setIndexForm(1)}
                />
            </footer>
        </div>

        <div className="form-container dados-pessoais">
            <h3>Informações de pagamento</h3>
            <h4>Banco</h4>
            <div className="row">
                <div className="campo">
                    <p>Instituição financeira</p>
                    <span>{userData?.dados_bancarios.nome_banco || '---'}</span>
                </div>
                <div className="campo">
                    <p>Agência</p>
                    <span>{userData?.dados_bancarios.agencia || '---'}</span>
                </div>
                <div className="campo">
                    <p>Conta</p>
                    <span>{userData?.dados_bancarios.numero_conta || '---'}</span>
                </div>
            </div>

            <h4>Pix</h4>

            <div className="row">
                <div className="campo">
                    <p>Tipo de Chave</p>
                    <span>{userData?.dados_bancarios.tipo_chave_pix || '---'}</span>
                </div>

                <div className="campo">
                    <p>Chave Pix</p>
                    <span>{userData?.dados_bancarios.pix || '---'}</span>
                </div>
            </div>

            <footer className="footer-action">
                <ButtonComponent
                    label="Editar"
                    variant="text"
                    size="large"
                    startIcon={<HiPencil />}
                    onClick={() => setIndexForm(2)}
                />
            </footer>
        </div>

        <div className="form-container dados-pessoais">
            <h3>Endereço</h3>
            
            <div className="grid col3">
                <div className="campo">
                    <p>CEP</p>
                    <span>{userData?.cep || '---'}</span>
                </div>
                <div className="campo">
                    <p>Logradouro</p>
                    <span>{userData?.logradouro || '---'}</span>
                </div>
                <div className="empty"></div>

                <div className="campo">
                    <p>Número</p>
                    <span>{userData?.numero || '---'}</span>
                </div>
                <div className="campo">
                    <p>Unidade</p>
                    <span>{userData?.unidade || '---'}</span>
                </div>

                <div className="campo">
                    <p>Complemento</p>
                    <span>{userData?.complemento || '---'}</span>
                </div>

                <div className="campo">
                    <p>Cidade</p>
                    <span>{userData?.cidade || '---'}</span>
                </div>
                <div className="campo">
                    <p>Estado</p>
                    <span>{userData?.estado || '---'}</span>
                </div>

                <div className="campo">
                    <p>Bairro</p>
                    <span>{userData?.bairro || '---'}</span>
                </div>
            </div>

            <footer className="footer-action">
                <ButtonComponent
                    label="Editar"
                    variant="text"
                    size="large"
                    startIcon={<HiPencil />}
                    onClick={() => setIndexForm(3)}
                />
            </footer>
        </div>

    </section>
}