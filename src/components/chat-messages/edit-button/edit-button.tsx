import React, { useState } from 'react';
import Popup from '@ui/popup/popup';
import CopyIcon from '@public/copy.svg';
import ReplyIcon from '@public/reply.svg';
import PinIcon from '@public/office-pin.svg';
import DownloadIcon from '@public/download.svg';
import DeleteIcon from '@public/delete.svg';
import SelectIcon from '@public/select.svg';
import MoreIcon from '@public/more.svg';
import classes from '@components/chat-messages/edit-button/edit-button.module.scss';
import Button from '@ui/button/button';
import List from '@ui/list/list';
import Grid from '@ui/grid/grid';
import classNames from 'classnames';

export const EditButton: React.FC = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const items = [
    {
      title: 'Reply',
      icon: <ReplyIcon className={classes['popup-item__icon']} />,
    },
    {
      title: 'Pin Message',
      icon: <PinIcon className={classes['popup-item__icon']} />,
    },
    {
      title: 'Copy Text',
      icon: <CopyIcon className={classes['popup-item__icon']} />,
    },
    {
      title: 'Forward message',
      icon: <DownloadIcon className={classes['popup-item__icon']} />,
    },
    {
      title: 'Delete message',
      icon: (
        <DeleteIcon
          className={classNames(
            classes['popup-item__icon'],
            classes['popup-item__icon-delete']
          )}
        />
      ),
    },
    {
      title: 'Select message',
      icon: <SelectIcon className={classes['popup-item__icon']} />,
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchor(event.currentTarget);
  const handlePopupClose = () => setAnchor(null);

  return (
    <>
      <Button onClick={handleClick} className={classes['btn-edit']}>
        <MoreIcon className={classes['btn-edit__icon']} />
      </Button>
      <Popup open={Boolean(anchor)} anchor={anchor} onClose={handlePopupClose}>
        <List items={items} className={classes['popup']}>
          {({ title, icon }) => (
            <Grid
              key={title}
              alignItems="center"
              className={classes['popup-item']}
            >
              {icon}
              <p className={classes['popup-item__title']}>{title}</p>
            </Grid>
          )}
        </List>
      </Popup>
    </>
  );
};

export default EditButton;
