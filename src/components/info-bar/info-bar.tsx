import Grid from '@/src/ui/grid/grid';
import React from 'react';
import classes from '@components/info-bar/info-bar.module.scss';
import CloseIcon from '@public/close.svg';
import InfoIcon from '@public/info.svg';
import BellIcon from '@public/bell.svg';
import ImageIcon from '@public/image.svg';
import LinkIcon from '@public/link.svg';
import ListIcon from '@public/list.svg';
import SliderIcon from '@public/slider.svg';
import { AvatarIcon } from '@components/chat-bar/avatar-icon';
import { Button } from '@/src/ui/ui';

export interface Props {
    title: string;
    avatarURL: string;
  }

export const InfoBar: React.FC<Props> = ({ title, avatarURL }: Props) => {
    return (
        <Grid direction="column" className={classes['info-bar']}>
            <Grid direction="row" className={classes['info-bar__header']}>
                <h1 className={classes['info-bar__header-title']}>User Info</h1>
                <Button className={classes['info-bar__header-button']}><CloseIcon className={classes['info-bar__header-close-icon']} /></Button>
            </Grid>

            <Grid alignItems="center" className={classes['info-bar__avatar']}>
                <Grid className={classes['info-bar__avatar-grid']}><AvatarIcon username={title} url={avatarURL}></AvatarIcon></Grid>
                <Grid direction="column" className={classes['info-bar__text']}>
                    <p className={classes['info-bar__title']}>{title}</p>
                    <Grid alignItems="center">
                        <p className={classes['info-bar__status']}>Active Now</p>
                        <span className={classes['info-bar__status-icon']}></span>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid direction="column" className={classes['info-bar__info']}>
                <Grid direction="row">
                    <InfoIcon className={classes['info-bar__info-icon']}/>
                    <p className={classes['info-bar__info-bio-click']}>Some biography</p>
                </Grid>
                <p className={classes['info-bar__info-bio-text']}>Bio</p>
                <p className={classes['info-bar__info-user-name']}>@anna-banu</p>
                <p className={classes['info-bar__info-user-text']}>Username</p>
            </Grid>

            <Grid direction="row" className={classes['info-bar__notif']}>
                <BellIcon className={classes['info-bar__notif-bell-icon']}/>
                <p className={classes['info-bar__notif-text']}>Notifications</p>
                <SliderIcon className={classes['info-bar__notif-slider-icon']}/>
            </Grid>

            <Grid direction="column" className={classes['info-bar__files']}>
                <Grid direction="row" className={classes['info-bar__files-photo-grid']}>
                    <Button className={classes['info-bar__files-button']}><ImageIcon className={classes['info-bar__files-image-icon']}/>
                    <p className={classes['info-bar__files-image-text']}>52 photos</p></Button>
                </Grid>
                <Grid direction="row" className={classes['info-bar__files-links-grid']}>
                    <Button className={classes['info-bar__files-button']}><LinkIcon className={classes['info-bar__files-link-icon']}/>
                    <p className={classes['info-bar__files-link-text']}>112 shared links</p></Button>
                </Grid>
            </Grid>

            <Grid direction="column" className={classes['info-bar__function']}>
                <Grid direction="row" className={classes['info-bar__function-grid']}>
                    <Button className={classes['info-bar__function-button']}><ListIcon className={classes['info-bar__function-list-icon']}/>
                    <p className={classes['info-bar__function-clear-history']}>Clear history</p></Button>
                </Grid>
                <Button className={classes['info-bar__function-button']}><p className={classes['info-bar__function-delete-chat']}>Delete chat</p></Button>
                <Button className={classes['info-bar__function-button']}><p className={classes['info-bar__function-block-user']}>Block user</p></Button>
            </Grid>
        </Grid>
    );
};

export default InfoBar;