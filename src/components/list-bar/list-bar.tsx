import React from 'react';
import Grid from '@ui/grid/grid';
import List from '@ui/list/list';
import Search from '@components/search/search';
import CreateDialog from '@components/dialogs/create-dialog/create-dialog';
import classes from '@components/list-bar/list-bar.module.scss';
import classNames from 'classnames';
import { menuStateVar, MenuStateEnum } from '@store/menu';
import { gql, useQuery } from '@apollo/client';
import SideBar from '@components/side-bar/side-bar';

export interface ItemType {
    id: string
    title: string
    desc: string
    time: string
    messages: number
    avatarURL: string
    active: boolean
}

export interface Props {
    title: string
    children?: JSX.Element[]
}

export const ListBar: React.FC<Props> = ({ title }) => {
    const items: ItemType[] = [
        {
            id: '1',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '2',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: true,
        },
        {
            id: '3',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '4',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '5',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '6',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '7',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '8',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '9',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '10',
            title: 'Blanka Turaria',
            desc: 'Thanks for the file sharing fdsfdsfdsfjwyfuerwinvuferyvugynreughbnvurewgvhuenhrgvurewhgvures',
            time: 'Just Now',
            messages: 5,
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        }
    ];

    const { data: { localState: { menuState } } } = useQuery(gql`
        query {
            localState @client {
                menuState
            }
        }
    `);

    return (
        <Grid
            direction='column'
            className={classNames(
                classes['list-bar'], 
                { [classes['list-bar_show']]: menuState === MenuStateEnum.MOVING_ACTIVE },
                { [classes['list-bar_hidden']]: menuState === MenuStateEnum.MOVING_DEACTIVE }
            )}
        >
            <Grid direction='column' className={classes['list-bar__header']}>
                <h1 className={classes['list-bar__title']}>{title}</h1>
                <Search />
                <Grid
                    alignItems='center'
                    justify='space-between'
                    direction='row'
                    className={classes['list-bar__btns']}
                >
                    {/* <CreateDialog /> */}
                </Grid>
            </Grid>
            <List items={items} className={classes['list']}>
                {
                    ({ id, title, desc, time, messages, active, avatarURL}: ItemType) => (
                        <Grid
                            key={id}
                            alignItems='center'
                            direction='row'
                            wrap='nowrap'
                            justify='space-between'
                            className={classNames(
                                classes['list-item'], 
                                active ? classes['list-item_active'] : '', 
                            )}
                        >
                            <Grid alignItems='center' justify='space-between' className={classes['list-item__header']}>
                                <div className={classes['list-item__avatar']}>
                                    <img className={classes['list-item__image']} src={avatarURL} alt=""/>
                                    <span className={classes['list-item__status']}>
                                        <span className={classes['list-item__online-status']}></span>
                                    </span>
                                </div>
                                <Grid 
                                    direction='column'
                                    className={classes['list-item__text']}
                                >
                                    <p className={classes['list-item__title']}>{title}</p>
                                    <p className={classes['list-item__desc']}>{desc}</p>
                                </Grid>
                            </Grid>
                            <Grid
                                direction='column'
                                className={classes['list-item__info']}
                            >
                                <p className={classes['list-item__time']}>{time}</p>
                                <p className={classes['list-item__nums']}><span>{messages}</span></p>
                            </Grid>
                        </Grid>
                    )
                }
            </List>
            {
                menuState === MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE ?
                <SideBar.Horizontal /> :
                null
            }
        </Grid>
    );
};

export default ListBar;