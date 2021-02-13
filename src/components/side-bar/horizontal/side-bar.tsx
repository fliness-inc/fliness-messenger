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
        case PageTypeEnum.SETTINGS:
          router.push('/settings');
          break;
      }
    },
    []
  );

  return (
    <>
      <Grid className={classes['side-bar__plug']} />
      <Grid
        className={classNames(
          classes['side-bar'],
          classes['side-bar_horizontal']
        )}
      >
        <MenuItem
          Icon={DialogsIcon}
          className={classes['menu__item_horizontal']}
          onClick={handleMenuItemClick.bind(this, PageTypeEnum.DIALOGS)}
          active={
            currentPage === PageTypeEnum.DIALOGS ||
            currentPage === PageTypeEnum.DIALOG
          }
        />
        <MenuItem
          Icon={GroupsIcon}
          className={classes['menu__item_horizontal']}
          onClick={handleMenuItemClick.bind(this, PageTypeEnum.GROUPS)}
          active={currentPage === PageTypeEnum.GROUPS}
        />
        <MenuItem
          Icon={ChannelsIcon}
          className={classes['menu__item_horizontal']}
          onClick={handleMenuItemClick.bind(this, PageTypeEnum.CHANNELS)}
          active={currentPage === PageTypeEnum.CHANNELS}
        />
        <MenuItem
          Icon={SettingsIcon}
          className={classes['menu__item_horizontal']}
          onClick={handleMenuItemClick.bind(this, PageTypeEnum.SETTINGS)}
          active={currentPage === PageTypeEnum.SETTINGS}
        />
      </Grid>
    </>
  );
};

export default SideBar;
