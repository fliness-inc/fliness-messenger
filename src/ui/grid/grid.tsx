import React from 'react';
import classNames from 'classnames';
import classes from '@ui/grid/grid.module.scss';

export interface Props {
    className?: string
    direction?: 'row' | 'column' | 'row-reverse' | 'column-revers'
    justify?: 'center' | 'start' | 'center' | 
        'end' | 'flex-start' | 'flex-end' | 
        'space-between' | 'space-around'
    alignItems?: 'center' | 'start' | 'center' | 
        'end' | 'flex-start' | 'flex-end' | 
        'space-between' | 'space-around'
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
    children?: JSX.Element | JSX.Element[] | string | (JSX.Element | JSX.Element[] | string)[]
}

export const Grid: React.FC<Props> = ({
    className = '',
    direction = 'row',
    justify = 'flex-start',
    alignItems = 'flex-start',
    children
}: Props) => {
    return (
        <div className={classNames(
            classes['grid'],
            classes[`grid_dir-${direction}`],
            classes[`grid_justify-${justify}`],
            classes[`grid_align-${alignItems}`],
            className
        )}>
            {children}
        </div>
    )
}

export default Grid;