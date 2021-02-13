import React from 'react';
import classes from './chat-bar.module.scss';

export interface AvatarIconProps {
  url?: string;
  username: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = (
  props: AvatarIconProps
) => {
  const { username, url } = props;
  let icon = null;

  if (url) icon = <img src={url} className={classes['chat-bar__avatar-img']} />;
  else
    icon = (
      <span className={classes['chat-bar__avatar-plug']}>
        <span>{username[0].toUpperCase()}</span>
      </span>
    );

  return <div>{icon}</div>;
};
