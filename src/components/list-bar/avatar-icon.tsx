import React from 'react';
import classes from './list-bar.module.scss';

export interface AvatarIconProps {
  url?: string;
  username: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = (
  props: AvatarIconProps
) => {
  const { url, username } = props;
  let icon = null;

  if (!username.length) throw new Error(`The username was not provided!`);

  if (url) {
    icon = (
      <img className={classes['list-item__image-root']} src={url} alt="" />
    );
  } else {
    icon = (
      <span className={classes['list-item__image-stub']}>
        <span>{username[0].toUpperCase()}</span>
      </span>
    );
  }

  return <div className={classes['list-item__image-layout']}>{icon}</div>;
};
