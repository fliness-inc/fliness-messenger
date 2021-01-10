import React from 'react';
import ReactDOM from 'react-dom';
import classes from '@ui/dialog/dialog.module.scss';
import classNames from 'classnames';

export interface DialogContentProps {
    className?: string
    children?: JSX.Element | JSX.Element[]
}

export const DialogContent: React.FC<DialogContentProps> = 
    ({ children, className }: DialogContentProps) => 
{
    return (
        <div className={classNames(classes['dialog__content'], className)}>{children}</div>
    );
};


export interface DialogBackgroundProps {
    className?: string
    onClick?: () => void
}

export const DialogBackground: React.FC<DialogBackgroundProps> = 
    ({ className, onClick = () => {} }: DialogBackgroundProps) => 
{
    return (
        <div className={classNames(classes['dialog__background'], className)} onClick={onClick}></div>
    );
};

export interface DialogProps {
    open: boolean,
    onOpen?: () => void,
    onClose?: () => void,
    children?: JSX.Element | JSX.Element[]
}

export const Dialog: React.FC<DialogProps> = ({ 
    open: shouldOpen, 
    onOpen = () => {},
    onClose = () => {},
    children 
}: DialogProps) => {
    const ref = React.useRef<{ el: HTMLDivElement, mounted: boolean }>({ el: null, mounted: false });
    const [open, setOpen] = React.useState(false);

    const handleWindowResize = React.useCallback(() => {
        if (!open) return;
        
        onClose();
        setOpen(false);
    }, []);

    React.useEffect(() => {
        const el = document.createElement('div');
        el.classList.add(classes['dialog']);
        
        ref.current = {
            el,
            mounted: false,
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            if (ref.current.mounted) document.body.removeChild(ref.current.el);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    React.useEffect(() => {
        setOpen(shouldOpen);
    }, [shouldOpen]);

    React.useEffect(() => {
        if (!ref.current.mounted && open) {
            document.body.appendChild(ref.current.el);
            ref.current.mounted = true;
            
            onOpen();
        }
        else if (ref.current.mounted && !open) {
            document.body.removeChild(ref.current.el);
            ref.current.mounted = false;
        };
    }, [open]);

    const handleBackgroundClick = React.useCallback(() => {
        onClose();
        setOpen(false);
    }, []);

    return open ? ReactDOM.createPortal(
        <>
            <DialogBackground onClick={handleBackgroundClick}/>
            {children}
        </>,
        ref.current.el) : null;
}

export default Dialog;