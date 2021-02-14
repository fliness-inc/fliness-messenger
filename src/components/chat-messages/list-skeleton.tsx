import React from 'react';
import classes from './chat-messages.module.scss';
import { Grid, List } from '@ui/ui';
import classNames from 'classnames';
import Skeleton from '@ui/skeleton/skeleton';

export interface ListProps {
  className?: string;
  count?: number;
}

export const ChatMessagesSkeletonList: React.FC<ListProps> = (
  props: ListProps
) => {
  const { className = '', count = 5 } = props;
  const items = Array.from(new Array(count).keys());

  return (
    <List
      items={items}
      className={classNames(classes['chat-messages'], className)}
    >
      {index => {
        const shift = index % 3 === 0;
        return (
          <Grid key={index} direction="column" className={classes['message']}>
            <Grid alignItems="center" direction={shift ? 'row-reverse' : 'row'}>
              <Skeleton
                width={'32px'}
                height={'32px'}
                radius={'50%'}
                className={classes['avatar__icon']}
              />
              <Skeleton
                width={'100px'}
                height={'20px'}
                radius={'4px'}
                className={classes['avatar__name']}
              />
            </Grid>
            <Grid
              justify="center"
              direction="column"
              alignItems={shift ? 'flex-end' : 'flex-start'}
              className={classes['message__text-skeleton']}
            >
              <Skeleton width={'350px'} height={'60px'} />
            </Grid>
            <Grid
              justify="center"
              direction="column"
              alignItems={shift ? 'flex-end' : 'flex-start'}
            >
              <Skeleton width={'96px'} height={'14px'} radius={'4px'} />
            </Grid>
          </Grid>
        );
      }}
    </List>
  );
};

export default ChatMessagesSkeletonList;
