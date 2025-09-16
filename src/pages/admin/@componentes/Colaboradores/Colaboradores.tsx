
import useAdminStore from "../../../../stores/admin/useAdminStore";
import ButtonComponent from "@/components/Button/Button";
import { HiPlus } from "react-icons/hi";
import { HiArrowUpTray, HiPencil } from "react-icons/hi2";
import { Table, TableBody, TableHead, TableRow, TableCell, Pagination, TablePagination, Box, Menu, MenuItem, TableSortLabel, Chip } from '@mui/material';
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const COLUMNS = [
    { id: 'nome', label: 'Nome', minWidth: 250, align: 'left' },
    { id: 'cargo', label: 'Cargo', minWidth: 100, align: 'left' },
    { id: 'loja', label: 'Loja', minWidth: 100, align: 'left' },
    { id: 'update_at', label: 'Última alteração', minWidth: 100, align: 'left' },
    { id: 'action', label: 'Ações', minWidth: 100, align: 'center' },

] as const;

type Order = 'asc' | 'desc';

export default function Colaboradores() {
    const usuarios = useAdminStore((s) => s.usuarios);
    const route = useRouter();

    // Estado da paginação
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // 🔹 Estado do filtro
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCargo, setSelectedCargo] = useState<string | null>(null);
    const cargos = useAdminStore((s) => s?.cargos);

    // Ordenação
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>('nome');

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // volta para a página inicial
    };

    const sortAndFilter = useMemo(() => {
        if (!usuarios) return [];

        // 🔹 1. Ordenação
        const sorted = [...usuarios].sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;

            switch (orderBy) {
                case "nome":
                    aValue = a.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
                    bValue = b.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
                    break;
                case "cargo":
                    aValue = a.perfil_login_nome || "Sem perfil";
                    bValue = b.perfil_login_nome || "Sem perfil";
                    break;
                case "loja":
                    aValue = a.loja_nome || "Sem loja";
                    bValue = b.loja_nome || "Sem loja";
                    break;
                case "update_at":
                    aValue = new Date(a.updated_at).getTime();
                    bValue = new Date(b.updated_at).getTime();
                    break;
                default:
                    aValue = "";
                    bValue = "";
            }

            if (aValue < bValue) return order === "asc" ? -1 : 1;
            if (aValue > bValue) return order === "asc" ? 1 : -1;
            return 0;
        });

        // 🔹 2. Filtro por cargo
        const filtered = selectedCargo
            ? sorted.filter(
                (u) => (u.cargos.find((e) => e.cargo === selectedCargo))
            )
            : sorted;

        return filtered;
    }, [usuarios, order, orderBy, selectedCargo]);

    const paginatedUsuarios = useMemo(() => {
        const filtered = sortAndFilter;

        // 🔹 3. Paginação
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;

        return filtered.slice(start, end);
    }, [sortAndFilter, page, rowsPerPage]);


    // 🔹 Abrir/fechar menu
    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => setAnchorEl(null);

    const handleSelectCargo = (cargo: string | null) => {
        setSelectedCargo(cargo);
        setPage(0);
        handleCloseMenu();
    };

    function TablePaginationActions(props: { page: number; rowsPerPage: number; }) {
        const { page, rowsPerPage, } = props;

        return (
            <Box >
                <Pagination
                    count={Math.ceil((sortAndFilter?.length || 0) / rowsPerPage)} // total de páginas
                    page={page + 1} // MUI é 1-based, mas TablePagination é 0-based
                    onChange={(_, value) => setPage(value - 1)}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        );
    };

    const handleRequestSort = (columnId: string) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };

    return (
        <section className="colaboradores-admin">
            <div className="btn-actions">
                <ButtonComponent labelColor="white" label="Adicionar colaborador" endIcon={<HiPlus className="icon-white" />} size={"large"} variant={"contained"} onClick={() => route.push('/admin/colaborador')} />
                <ButtonComponent label="Subir planilha" disabled endIcon={<HiArrowUpTray />} size={"large"} variant={"outlined"} />
            </div>
            <div className="table-container">
                <ButtonComponent
                    variant="outlined"
                    size="large"
                    onClick={handleOpenMenu}
                    label={selectedCargo ? `Cargo: ${selectedCargo}` : "Filtrar por cargo"}
                />
                {/* 🔹 Menu de cargos */}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    <MenuItem onClick={() => handleSelectCargo(null)}>Todos</MenuItem>
                    {cargos.map((cargo, idx) => (
                        <MenuItem key={idx} onClick={() => handleSelectCargo(cargo.name)}>
                            {cargo.name}
                        </MenuItem>
                    ))}
                </Menu>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    className="pagination-container"
                    count={sortAndFilter?.length || 0}
                    ActionsComponent={TablePaginationActions}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Funcionários por página"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) =>
                        `Mostrando ${from} a ${to} de ${count !== -1 ? count : `mais de ${to}`}`
                    }
                />

                <Table>
                    <TableHead className='head-table'>
                        <TableRow sx={{ height: '82px' }}>
                            {COLUMNS.map((column, index) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className={index === 0 ? 'first' : ''}
                                    style={{ width: column.minWidth }}
                                >
                                    {column.id !== 'action' ? (
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedUsuarios?.map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={index}
                                    tabIndex={-1}
                                    className={`row-table`}
                                // onMouseEnter={() => setIsHover(index)}
                                >
                                    <TableCell padding='none'>
                                        <div className={`first `}>
                                            <div className='col text' style={{ width: COLUMNS[0].minWidth }}>
                                                <span>{row.name}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell padding='none'>
                                        <div className={`col-table`}>
                                            <div className='col chips' style={{ width: COLUMNS[1].minWidth }}>
                                                {[...new Map(row.cargos.map(item => [item.perfil_login_id, item])).values()].map((cargo) => (
                                                    <Chip label={cargo.cargo} className='chip primary' key={cargo.id} />
                                                ))}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell padding='none'>
                                        <div className={`col-table`}>
                                            <div className='col chips' style={{ width: COLUMNS[2].minWidth }}>
                                                {[...new Map(row.lojas.map(item => [item.loja_id, item])).values()].map((loja, index) => (
                                                    <Chip label={loja.loja_nome} className='chip green' key={index} />
                                                ))}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell padding='none'>
                                        <div className={`col-table`}>
                                            <div className='col text' style={{ width: COLUMNS[3].minWidth }}>
                                                <span>{new Date(row.updated_at).toLocaleDateString('pt-BR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell padding='none'>
                                        <div className={`col-table btn-action`} style={{ width: COLUMNS[4].minWidth }}>
                                            <ButtonComponent label="Editar" onClick={() => route.push('/admin/colaborador/' + row.id)} labelColor="white" startIcon={<HiPencil className="icon-white" />} size="small" variant="contained" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>

                    {(!!paginatedUsuarios && paginatedUsuarios.length === 0) &&
                        <TableBody>
                            <TableRow tabIndex={-1} className='row-table'>
                                <TableCell colSpan={COLUMNS.length} style={{ border: 'none' }}>
                                    Nenhum processo encontrado
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    }
                </Table>
            </div>
        </section>
    );
}