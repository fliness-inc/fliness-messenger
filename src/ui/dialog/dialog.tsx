import React, { useState, useEffect, useRef } from 'react';
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
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!ref.current) {
            const el = document.createElement('div');
            el.classList.add(classes['dialog']);
            
            const body = document.getElementsByTagName('body')[0];
    
            ref.current = {
                body: body,
                el: el
            }
        }

        setOpen(shouldOpen);

    }, [shouldOpen]);

    useEffect(() => {
        if (!mounted && open) {
            ref.current.body.appendChild(ref.current.el);
            setMounted(true);
            onOpen();
        }
        else if (mounted && !open) {
            ref.current.body.removeChild(ref.current.el);
            setMounted(false);
        };
    }, [open]);

    const handleBackgroundClick = () => {
        onClose();
        setOpen(false);
    }

    return mounted ? ReactDOM.createPortal(
        <>
            <DialogBackground onClick={handleBackgroundClick}/>
            {children}
        </>,
        ref.current.el) : null;
}

export default Dialog;