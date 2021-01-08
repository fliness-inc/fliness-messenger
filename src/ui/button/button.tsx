import React from 'react';
import classNames from 'classnames';
import classes from '@ui/button/button.module.scss';

export interface Props {
    className?: string
    children?: JSX.Element | JSX.Element[] | string
    onClick?: () => void
    variant?: 'contained' | 'outlined'
}

export const Button: React.FC<Props> = ({
    className = '',
    children,
    variant,
    onClick = () => {}
}: Props) => {
    return (
        <button 
            className={classNames(
                classes['btn'],
                variant === 'contained' ? classes['btn_contained'] : '',
                variant === 'outlined' ? classes['btn_outlined'] : '',
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;