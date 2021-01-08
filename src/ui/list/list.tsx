import React from 'react';
import Grid from '@ui/grid/grid';

export interface Props {
    className?: string
    items: any[]
    children: any
}

export const List: React.FC<Props> = ({
    className,
    items,
    children
}: Props) => {
    return (
        <Grid direction='column' className={className}>
            {
                items.map(item => children(item))
            }
        </Grid>
    );
};

export default List;