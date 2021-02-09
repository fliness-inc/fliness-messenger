import React from 'react';
import { Grid } from '@ui/ui';
import Search from '@components/search/search';
import CreateDialog from '@components/dialogs/create-dialog/create-dialog';
import classes from '@components/list-bar/list-bar.module.scss';
import { LBLayout } from './layout';
import { LBSkeleton } from './skeleton';
import dynamic from 'next/dynamic';

const DynamicList = dynamic(() => import('./list'), {
  ssr: false,
  loading: () => <LBSkeleton />,
});

export interface Props {
  title: string;
  children?: JSX.Element[];
}

export const ListBar: React.FC<Props> = ({ title }) => {
  return (
    <LBLayout>
      <Grid direction="column" className={classes['list-bar__header']}>
        <h1 className={classes['list-bar__title']}>{title}</h1>
        <Search />
        <Grid
          alignItems="center"
          justify="space-between"
          direction="row"
          className={classes['list-bar__btns']}
        >
          <CreateDialog />
        </Grid>
      </Grid>
      <DynamicList />
    </LBLayout>
  );
};

export default ListBar;
