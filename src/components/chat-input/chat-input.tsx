import React from 'react';
import classNames from 'classnames';
import classes from '@components/chat-input/chat-input.module.scss';
import Grid from '@ui/grid/grid';
import Button from '@ui/button/button';

import ClipIcon from '@public/paper-clip.svg';
import PlaneIcon from '@public/paper-plane.svg';
import CameraIcon from '@public/camera.svg';

export interface Props {
    className?: string
}

export const ChatInput: React.FC<Props> = ({
    className
}: Props) => {
    return (
        <Grid alignItems='center' className={classes['chat-input']}>
            <Button className={classes['chat-input__btn']}>
                <ClipIcon className={classes['btn__icon']} />
            </Button>
            <Button className={classes['chat-input__btn']}>
                <CameraIcon className={classes['btn__icon']} />
            </Button>
            <input type='text' className={classes['chat-input__input']} placeholder='Type your message'/>
            <Button className={classes['chat-input__btn']}>
                <PlaneIcon className={classes['btn__icon']} />
            </Button>
        </Grid>
    );
};

export default ChatInput;