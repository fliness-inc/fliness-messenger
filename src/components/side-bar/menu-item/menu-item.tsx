import React from 'react';
import Grid from '@ui/grid/grid';
import Button from '@ui/button/button';
import classNames from 'classnames';
import classes from '@components/side-bar/side-bar.module.scss';

export interface Props {
  active?: boolean;
  Icon: React.FC<any>;
  onClick?: () => void;
  className?: string;
}

export const MenuItem: React.FC<Props> = ({
  active = false,
  Icon,
  onClick = () => {},
  className,
}: Props) => {
  return (
    <Grid>
      <Button
        className={classNames(classes['menu__item'], className, {
          [classes['menu__item_active']]: active,
        })}
        onClick={onClick}
      >
        <Icon className={classes['item__icon']} />
      </Button>
    </Grid>
  );
};

export default MenuItem;
