import React from 'react';
import Grid from '@ui/grid/grid';

export interface ListProps {
  className?: string;
  items: any[];
  children: (any) => JSX.Element;
}

export const List: React.FC<ListProps> = ({
  className,
  items,
  children = item => item,
}: ListProps) => {
  return (
    <Grid direction="column" className={className}>
      {items.map(item => children(item))}
    </Grid>
  );
};

export default List;
