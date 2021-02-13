import React from 'react';
import Grid from '@ui/grid/grid';

export interface ListProps {
  className?: string;
  items: any[];
  children: (any) => JSX.Element;
}

export const List = React.forwardRef(
  (props: ListProps, ref: React.MutableRefObject<HTMLDivElement>) => {
    const { className, items, children = item => item } = props;

    return (
      <Grid ref={ref} direction="column" className={className}>
        {items.map(item => children(item))}
      </Grid>
    );
  }
);

export default List;
