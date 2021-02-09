import { NextPage } from 'next';
import React from 'react';
import MenuIcon from '@public/menu.svg';
import LogoIcon from '@public/logo.svg';
import ArrowDown from '@public/keyboard_arrow_down.svg';
import classes from '@components/app-bar/app-bar.module.scss';
import Grid from '@ui/grid/grid';
import Button from '@ui/button/button';
import { menuStateVar, MenuStateEnum } from '@store/menu';

export interface AppBarProps {
  username: string;
  avatarURL: string;
}

export const AppBar: NextPage<AppBarProps> = ({ username, avatarURL }) => {
  const handleMenuButtonClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      switch (menuStateVar()) {
        case MenuStateEnum.MOVING_ACTIVE:
          menuStateVar(MenuStateEnum.MOVING_DEACTIVE);
          break;
        case MenuStateEnum.MOVING_DEACTIVE:
          menuStateVar(MenuStateEnum.MOVING_ACTIVE);
          break;
        case MenuStateEnum.MOVING_ON_TOP_ACTIVE:
          menuStateVar(MenuStateEnum.MOVING_ON_TOP_DEACTIVE);
          break;
        case MenuStateEnum.MOVING_ON_TOP_DEACTIVE:
          menuStateVar(MenuStateEnum.MOVING_ON_TOP_ACTIVE);
          break;
        case MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE:
          menuStateVar(MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_DEACTIVE);
          break;
        case MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_DEACTIVE:
          menuStateVar(MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE);
          break;
      }
    },
    []
  );

  return (
    <Grid direction="row" alignItems="center" className={classes['app-bar']}>
      <Grid justify="space-between">
        <Grid alignItems="center" justify="flex-start">
          <Grid
            alignItems="center"
            justify="center"
            className={classes['menu']}
          >
            <Button
              className={classes['menu__btn']}
              onClick={handleMenuButtonClick}
            >
              <MenuIcon className={classes['menu__icon']} />
            </Button>
          </Grid>
          <Grid alignItems="center" className={classes['logo']}>
            <LogoIcon className={classes['logo__icon']} />
            <h1 className={classes['logo__title']}>Fliness</h1>
          </Grid>
        </Grid>
        <Grid alignItems="center" justify="flex-end">
          <Grid
            alignItems="center"
            justify="flex-end"
            className={classes['account']}
          >
            <Button className={classes['account__btn']}>
              <p className={classes['account__username']}>{username}</p>
              <img
                className={classes['account__avatar']}
                alt="user avatar"
                src="/user.jpg"
                draggable={false}
              />
              <ArrowDown className={classes['account__arrow-icon']} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AppBar;
