import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions, IconButton, Slide } from '@mui/material';
import { Close } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

const TransitionVerticalTop = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string | React.ReactNode;
    children?: React.ReactNode;
    Footer?: React.ReactNode;
    paperWidth?: string
    paperHeight?: string    
    className?: string
}

export default function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open, children, title, Footer, paperWidth, paperHeight, ...rest } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            slotProps={{
                paper: {
                    sx: { width: paperWidth || 'auto', height: paperHeight || 'auto' },
                }
            }}
            //   TransitionComponent={TransitionVerticalTop}
            maxWidth={'lg'}
            {...rest}
        >
            {title && <DialogTitle>{title}</DialogTitle>}
            <IconButton
                aria-label="close"
                onClick={handleClose}
                className='icon-close'
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>

            <DialogContent className='dialog-content'>
                {children}
            </DialogContent>

            {Footer && <DialogActions>
                {Footer}
            </DialogActions>}


        </Dialog>
    );
}