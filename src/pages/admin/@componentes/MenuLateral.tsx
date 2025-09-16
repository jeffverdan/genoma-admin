import CargoIcon from "@/images/CargoIcon";
import ReciboIcon from "@/images/ReciboIcon";
import { MenuPrincipalTypes } from "@/types/Admin/menuLateral";
import { List, ListItemButton } from "@mui/material";
import { HiAdjustmentsHorizontal, HiBuildingOffice2, HiCurrencyDollar, HiHome, HiHomeModern, HiLifebuoy, HiUserGroup } from "react-icons/hi2";
import useAdminStore from "../../../stores/admin/useAdminStore";

const MENU_PRINCIPAL: MenuPrincipalTypes[] = [
    { id: 0, label: 'Visão geral', icon: <HiHome size={22} /> },
    // { id: 1, label: 'Empresa', icon: <HiBuildingOffice2 size={22} /> },
    // { id: 2, label: 'Lojas', icon: <HiHomeModern size={22} /> },
    // { id: 3, label: 'Cargos', icon: <CargoIcon size={22} /> },
    { id: 4, label: 'Colaboradores', icon: <HiUserGroup size={22} /> },
    // { id: 5, label: 'Recibo de sinal', icon: <ReciboIcon size={22} /> },
    // { id: 6, label: 'Comissão', icon: <HiCurrencyDollar size={22} /> },
    // { id: 7, label: 'Integrações', icon: <HiAdjustmentsHorizontal size={22} /> },
    // { id: 8, label: 'Ajuda', icon: <HiLifebuoy size={22} /> },
];

export default function MenuLateral() {    
    const selectedIndex = useAdminStore((s) => s.selectedIndex);
    const setSelectedIndex = useAdminStore((s) => s.setSelectedIndex);

    return (
        <nav className="menu-lateral list-items">
            <List className='menu-items'>
                {MENU_PRINCIPAL.map((item) => (
                    <ListItemButton
                        key={item.id}
                        className='item'
                        selected={selectedIndex === item.id}
                        onClick={() => setSelectedIndex(item.id)}
                    >
                        {item.icon} {item.label}
                    </ListItemButton>
                ))}
            </List>
        </nav>
    );
}