import CargoIcon from "@/images/CargoIcon";
import ReciboIcon from "@/images/ReciboIcon";
import { MenuPrincipalTypes } from "@/types/Admin/menuLateral";
import { List, ListItemButton } from "@mui/material";
import { HiAdjustmentsHorizontal, HiBuildingOffice2, HiCurrencyDollar, HiHome, HiHomeModern, HiLifebuoy, HiUserGroup } from "react-icons/hi2";

const MENU_PRINCIPAL: MenuPrincipalTypes[] = [
    { id: 0, label: 'Visão geral', icon: <HiHome size={22} /> },
    { id: 1, label: 'Empresa', icon: <HiBuildingOffice2 size={22} /> },
    { id: 2, label: 'Lojas', icon: <HiHomeModern size={22} /> },
    { id: 3, label: 'Cargos', icon: <CargoIcon size={22} /> },
    { id: 4, label: 'Colaboradores', icon: <HiUserGroup size={22} /> },
    { id: 5, label: 'Recibo de sinal', icon: <ReciboIcon size={22} /> },
    { id: 6, label: 'Comissão', icon: <HiCurrencyDollar size={22} /> },
    { id: 7, label: 'Integrações', icon: <HiAdjustmentsHorizontal size={22} /> },
    { id: 8, label: 'Ajuda', icon: <HiLifebuoy size={22} /> },
];

type PropsType = {
    selectedIndex: number
    handleChangeMenu: (index: number) => void
}

export default function MenuLateral(props: PropsType) {
    const { selectedIndex, handleChangeMenu } = props;

    return (
        <nav className="menu-lateral list-items">
            <List className='menu-items'>
                {MENU_PRINCIPAL.map((item) => (
                    <ListItemButton
                        key={item.id}
                        className='item'
                        selected={selectedIndex === item.id}
                        onClick={() => handleChangeMenu(item.id)}
                    >
                        {item.icon} {item.label}
                    </ListItemButton>
                ))}
            </List>
        </nav>
    );
}