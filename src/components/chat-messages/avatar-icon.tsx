import React from 'react';
import classes from './chat-messages.module.scss';

export interface AvatarIconProps {
  url?: string;
  username: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = (
  props: AvatarIconProps
) => {
  const { username, url } = props;
  let icon = null;

  if (url) icon = <img src={url} className={classes['avatar__icon']} />;
  else
    icon = (
      <span className={classes['avatar__icon-plug']}>
        <span>{username[0].toUpperCase()}</span>
      </span>
    );

  return <div className={classes['avatar']}>{icon}</div>;
};
