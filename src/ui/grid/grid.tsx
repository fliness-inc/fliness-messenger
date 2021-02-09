import React from 'react';
import classNames from 'classnames';
import classes from '@ui/grid/grid.module.scss';

export interface GridProps {
  className?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-revers';
  justify?:
    | 'center'
    | 'start'
    | 'center'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  alignItems?:
    | 'center'
    | 'start'
    | 'center'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  children?:
    | JSX.Element
    | JSX.Element[]
    | string
    | (JSX.Element | JSX.Element[] | string)[];
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Grid: React.FC<GridProps> = ({
  className = '',
  direction = 'row',
  justify = 'flex-start',
  alignItems = 'flex-start',
  onClick = (e: React.MouseEvent<HTMLDivElement>) => {},
  children,
}: GridProps) => {
  return (
    <div
      className={classNames(
        classes['grid'],
        classes[`grid_dir-${direction}`],
        classes[`grid_justify-${justify}`],
        classes[`grid_align-${alignItems}`],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Grid;
