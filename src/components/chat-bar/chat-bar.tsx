import React from 'react';
import classes from '@components/chat-bar/chat-bar.module.scss';
import Grid from '@ui/grid/grid';
import Button from '@ui/button/button';
import SearchIcon from '@public/search-24px.svg';
import MoreIcon from '@public/more.svg';
import SideBarIcon from '@public/sidebar.svg';

export interface Props {
  title: string;
  avatarURL: string;
}

export const ChatBar: React.FC<Props> = ({ title, avatarURL }: Props) => {
  return (
    <Grid
      justify="space-between"
      alignItems="center"
      className={classes['chat-bar']}
    >
      <Grid alignItems="center" className={classes['chat-bar__avatar']}>
        <img src={avatarURL} className={classes['chat-bar__avatar-icon']} />
        <Grid direction="column" className={classes['chat-bar__text']}>
          <p className={classes['chat-bar__title']}>{title}</p>
          <Grid alignItems="center">
            <p className={classes['chat-bar__status']}>Active Now</p>
            <span className={classes['chat-bar__status-icon']}></span>
          </Grid>
        </Grid>
      </Grid>
      <Grid alignItems="center" justify="flex-end">
        <Button className={classes['chat-bar__tool-btn']}>
          <SearchIcon className={classes['chat-bar__tool-btn-icon']} />
        </Button>
        <Button className={classes['chat-bar__tool-btn']}>
          <SideBarIcon className={classes['chat-bar__tool-btn-icon']} />
        </Button>
        <Button className={classes['chat-bar__tool-btn']}>
          <MoreIcon className={classes['chat-bar__tool-btn-icon']} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChatBar;
