import React, { MutableRefObject, useRef } from 'react';
import classNames from 'classnames';
import classes from '@ui/button/button.module.scss';

export interface Props {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'contained' | 'outlined';
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  className = '',
  children,
  variant,
  onClick = (event: React.MouseEvent<HTMLButtonElement>) => {},
  disabled = false,
}: Props) => {
  return (
    <button
      className={classNames(
        classes['btn'],
        { [classes['btn_contained']]: variant === 'contained' },
        { [classes['btn_outlined']]: variant === 'outlined' },
        { [classes['btn_disabled']]: disabled },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
