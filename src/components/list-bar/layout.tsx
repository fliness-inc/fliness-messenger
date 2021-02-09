import React from 'react';
import Grid from '@ui/grid/grid';
import { GET_LOCAL_STATE } from './list-bar.graphql';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import classes from './list-bar.module.scss';
import { MenuStateEnum } from '@store/menu';
import SideBar from '@components/side-bar/side-bar';

export interface Props {
  children?: JSX.Element[] | JSX.Element | string;
}

export const LBLayout: React.FC<Props> = ({ children }: Props) => {
  const {
    data: {
      localState: { menuState },
    },
  } = useQuery(GET_LOCAL_STATE);

  return (
    <Grid
      direction="column"
      className={classNames(
        classes['list-bar'],
        {
          [classes['list-bar_show']]: menuState === MenuStateEnum.MOVING_ACTIVE,
        },
        {
          [classes['list-bar_hidden']]:
            menuState === MenuStateEnum.MOVING_DEACTIVE,
        }
      )}
    >
      {children}
      {menuState === MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE ? (
        <SideBar.Horizontal />
      ) : null}
    </Grid>
  );
};

export default LBLayout;
