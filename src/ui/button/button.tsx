import React from 'react';
import classNames from 'classnames';
import classes from '@ui/button/button.module.scss';

export interface ButtonProps {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'contained' | 'outlined';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  variant,
  onClick = () => {},
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        classes['btn'],
        { [classes['btn_contained']]: variant === 'contained' },
        { [classes['btn_outlined']]: variant === 'outlined' },
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
