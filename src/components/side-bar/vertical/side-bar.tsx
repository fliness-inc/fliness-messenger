import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@ui/grid/grid';
import DialogsIcon from '@public/chat_bubble_outline.svg';
import GroupsIcon from '@public/group.svg';
import ChannelsIcon from '@public/megaphone.svg';
import SettingsIcon from '@public/settings.svg';
import { PageTypeEnum } from '@store/pages';
import classes from '@components/side-bar/side-bar.module.scss';
import MenuItem from '@components/side-bar/menu-item/menu-item';
import classNames from 'classnames';
import { gql, useQuery } from '@apollo/client';

export const SideBar: React.FC = () => {
  const router = useRouter();

  const {
    data: {
      localState: { currentPage },
    },
  } = useQuery(gql`
    query {
      localState @client {
        currentPage
      }
    }
  `);

  const handleMenuItemClick = React.useCallback(
    (type: PageTypeEnum, event: React.MouseEvent<HTMLButtonElement>) => {
      switch (type) {
        case PageTypeEnum.DIALOGS:
          router.push('/dialogs');
          break;
        case PageTypeEnum.GROUPS:
          router.push('/groups');
          break;
        case PageTypeEnum.CHANNELS:
          router.push('/channels');
          break;
      }
    },
    []
  );

  return (
    <Grid
      className={classNames(classes['side-bar'], classes['side-bar_vertical'])}
    >
      <Grid direction="column" className={classes['side-bar__menu']}>
        <MenuItem
          Icon={DialogsIcon}
          className={classes['menu__item_vertical']}
          onClick={handleMenuItemClick.bind(this, PageTypeEnum.DIALOGS)}
          active={currentPage === PageTypeEnum.DIALOGS}
        />
        <MenuItem
          Icon={GroupsIcon}
          className={classes['menu__item_vertical']}
          onClick={handleMenuItemClick.bind(this, PageTypeEnum.GROUPS)}
          active={currentPage === PageTypeEnum.GROUPS}
        />
        <MenuItem
          Icon={ChannelsIcon}
          className={classes['menu__item_vertical']}
          onClick={handleMenuItemClick.bind(this, PageTypeEnum.CHANNELS)}
          active={currentPage === PageTypeEnum.CHANNELS}
        />
      </Grid>
      <Grid justify="flex-end">
        <MenuItem
          Icon={SettingsIcon}
          className={classNames(
            classes['item__bottom'],
            classes['menu__item_vertical']
          )}
          onClick={handleMenuItemClick.bind(this, PageTypeEnum.SETTINGS)}
          active={currentPage === PageTypeEnum.SETTINGS}
        />
      </Grid>
    </Grid>
  );
};

export default SideBar;
