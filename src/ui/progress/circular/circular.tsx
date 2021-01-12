import React from 'react';
import classes from '@ui/progress/progress.module.scss';
import classNames from 'classnames';

export interface Props {
    width?: string,
    height?: string
    variant?: 'infinite' | 'determinate'
    value?: number
}

export const Circular: React.FC<Props> = ({
    width = '40px',
    height = '40px',
    variant = 'infinite',
    value = 0
}: Props) => {
    return (
        <div className={classNames(
                classes['progress__circular'],
                [classes[`progress__circular_${variant}`]],
            )} 
            style={{ width, height }}
        >
            <svg viewBox='22 22 44 44'>
                <circle 
                    cx={44}
                    cy={44}
                    r={20.2}
                    strokeWidth={3.6}
                    fill='none'
                    style={{
                        strokeDasharray: 126.92,
                        strokeDashoffset: `${126.92*(1 - (value/100))}px`,
                    }}
                />
            </svg>
        </div>
    )
}

export default Circular;