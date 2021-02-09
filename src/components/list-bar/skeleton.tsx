import { Skeleton } from '@ui/ui';
import React from 'react';
import Grid from '@ui/grid/grid';
import List from '@ui/list/list';
import classes from '@components/list-bar/list-bar.module.scss';
import classNames from 'classnames';

export const LBSkeleton: React.FC = () => {
  const items = [];

  for (let i = 0; i < 8; ++i) items.push({ id: i });

  return (
    <List items={items} className={classes['list']}>
      {({ id }) => (
        <Grid
          key={id}
          className={classNames(
            classes['list-item'],
            classes['list-item_skeleton']
          )}
        >
          <Skeleton width="100%" height="60px" />
        </Grid>
      )}
    </List>
  );
};

export default LBSkeleton;
