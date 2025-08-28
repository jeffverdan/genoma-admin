import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import logoGenoma from '@/images/genoma_logo_2.png';
import { useRouter } from 'next/router';
import ButtonComponent from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { HiBell, HiUser } from 'react-icons/hi2';

export default function Header() {
    //Controle de componentes globais
    const router = useRouter();
    const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorMenu);
    const splitRouter = router.asPath.split('/');
    const painelRouter = splitRouter[1];
    const [dialogAvatarEdit, setDialogAvatarEdit] = useState(false);

    const handleClickOpen = () => {
        setAnchorMenu(null);
        setDialogAvatarEdit(true);
    };
    const handleClose = () => {
        setDialogAvatarEdit(false);
    };

    const logout = () => {
        const startInfo = localStorage.getItem('startInfo') || false;
        localStorage.clear();
        localStorage.setItem('startInfo', startInfo.toString());
        router.push('/');
    };

    return (
        <div className="headerBar">
            <div className="row">
                <div className="coll coll-left">
                    <div className="logo-h">
                        <Image
                            src={logoGenoma}
                            alt="Genoma Imóveis"
                            title="Genoma Imóveis"
                            className='cursorClick'
                            onClick={() => painelRouter === 'meu-perfil' ? router.back() : router.push(`/${painelRouter}/`)}
                        />
                    </div>
                    <div className="line"></div>
                </div>
                <div className="coll coll-right">
                    <div className="desk-nav">
                        <ButtonComponent disabled size={'small'} variant={'text'} startIcon={<HiBell />} name={''} label={'Notificações'} />
                        <ButtonComponent size={'small'} onClick={(e) => setAnchorMenu(e.currentTarget)} variant={'text'} startIcon={<HiUser size={20} />} name={''} label={'Meu perfil'} />
                    </div>
                    <Menu
                        anchorEl={anchorMenu}
                        id="account-menu"
                        open={open}
                        onClose={() => setAnchorMenu(null)}
                        onClick={() => setAnchorMenu(null)}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }
                        }}
                    >

                        <MenuItem disabled onClick={handleClickOpen}>
                            <Avatar /> Mudar avatar
                        </MenuItem>
                        <Divider />
                        <MenuItem disabled onClick={() => setAnchorMenu(null)}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Adicionar nova conta
                        </MenuItem>
                        <MenuItem disabled onClick={() => setAnchorMenu(null)}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Configurações
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Sair
                        </MenuItem>

                    </Menu>

                    <Dialog
                        open={dialogAvatarEdit}
                        onClose={handleClose}
                        title='Mudar avatar'
                        Footer={<ButtonComponent size={'small'} variant={'text'} onClick={handleClose} name={''} label={'Fechar'} />}
                    >
                        {/* <DropFileUpload uploadURL={'/'} /> */}

                    </Dialog>
                </div>
            </div>
        </div>
    )
}