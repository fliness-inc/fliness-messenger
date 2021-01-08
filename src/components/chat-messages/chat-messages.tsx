import React from 'react';
import Grid from '@ui/grid/grid';
import List from '@ui/list/list';
import classNames from 'classnames';
import classes from '@components/chat-messages/chat-messages.module.scss';
import Button from '@ui/button/button';
import MoreIcon from '@public/more.svg';

export interface ItemType {
    id: string
    username: string
    avatarURL: string
    message: string
    time: string
}

export interface Props {
    className?: string
}

export const ChatMessages: React.FC<Props> = ({
    className
}: Props) => {
    const items: ItemType[] = [
        {
            id: '1',
            username: 'Blanka Turaria',
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            message: 'Home fine in so am good body this hope. ',
            time: '10:10 PM'
        },
        {
            id: '2',
            username: 'Blanka Turaria',
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            message: 'Call park out she wife face mean. Invitation excellence imprudence understood it continuing to. Ye show done an into.  ',
            time: '10:10 PM'
        },
        {
            id: '3',
            username: 'Andrew Piankov',
            avatarURL: 'user.jpg',
            message: 'Dashwood horrible he strictly on as. ',
            time: '10:10 PM'
        },
        {
            id: '4',
            username: 'Blanka Turaria',
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            message: 'Home fine in so am good body this hope. ',
            time: '10:10 PM'
        },
        {
            id: '5',
            username: 'Andrew Piankov',
            avatarURL: 'user.jpg',
            message: 'Dashwood horrible he strictly on as. ',
            time: '10:10 PM'
        },
        {
            id: '6',
            username: 'Andrew Piankov',
            avatarURL: 'user.jpg',
            message: 'Dashwood horrible he strictly on as. ',
            time: '10:10 PM'
        },
        {
            id: '7',
            username: 'Blanka Turaria',
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            message: 'Home fine in so am good body this hope. ',
            time: '10:10 PM'
        },
        {
            id: '8',
            username: 'Andrew Piankov',
            avatarURL: 'user.jpg',
            message: 'Dashwood horrible he strictly on as. ',
            time: '10:10 PM'
        },
    ];

    const me = { username: 'Andrew Piankov' };

    let prevUsername = null; // should be message id

    return (
        <List items={items} className={classNames(classes['chat-messages'], className)}>
            {
                ({ id, username, avatarURL, message, time }: ItemType) => {
                    const prev = prevUsername;
                    prevUsername = username;
                    return (
                        <Grid key={id} direction='column' className={classes['message']}>
                            {
                                prev === username ? null :
                                    <Grid 
                                        alignItems='center'
                                        direction={me.username === username ? 'row-reverse' : 'row'}
                                    >
                                        <img src={avatarURL} className={classes['avatar__icon']}/>
                                        <p className={classes['avatar__name']}>{username}</p>
                                        <Button className={classes['avatar__btn-edit']}>
                                            <MoreIcon className={classes['btn-edit__icon']}/>
                                        </Button>
                                    </Grid> 
                            }
                            
                            <Grid 
                                justify='center' 
                                direction='column'
                                alignItems={me.username === username ? 'flex-end' : 'flex-start'}
                            >
                                <Grid 
                                    alignItems='center' 
                                    direction={me.username === username ? 'row-reverse' : 'row'}
                                    className={classNames(
                                        classes['message__text'], 
                                        me.username === username ? classes['message__primary-text'] : ''
                                    )}
                                >
                                    <p>{message}</p>
                                </Grid>
                                <span className={classes['message__time']}>{time}</span>
                            </Grid>
                            
                        </Grid>
                    );
                }
            }
        </List>
    );
};

export default ChatMessages;