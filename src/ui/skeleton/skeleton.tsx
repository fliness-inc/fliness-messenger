import React from 'react';
import classNames from 'classnames';
import classes from '@ui/skeleton/skeleton.module.scss';

export interface Props {
    className?: string
    width: string
    height: string
    radius?: string
}

export const Skeleton: React.FC<Props> = ({
    className,
    width,
    height,
    radius = '4px'
}: Props) => {
    return (
        <span 
            className={classNames(
                    classes['skeleton'], 
                    classes['skeleton-pulse']
            )} 
            style={{ width, height, borderRadius: radius }}></span>
    );
};

export default Skeleton;