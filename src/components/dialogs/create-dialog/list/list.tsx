import React from 'react';
import List from '@ui/list/list';
import Grid from '@ui/grid/grid';
import Skeleton from '@ui/skeleton/skeleton';
import classNames from 'classnames';
import classes from '@components/dialogs/create-dialog/create-dialog.module.scss';
import Button from '@ui/button/button';

export interface ItemType {
    node: {
        id: string
        name: string
        avatarURL?: string
        active?: boolean
    }
}

export interface DialogListProps {
    items: ItemType[],
    skeleton?: boolean,
    onActiveItemChanged?: (index: string, event: React.MouseEvent<HTMLButtonElement>) => void
}

export const DialogList: React.FC<DialogListProps> = ({
    items,
    skeleton = false,
    onActiveItemChanged = (index: string, event: React.MouseEvent<HTMLButtonElement>) => {}
}: DialogListProps) => {
    const nodes: ItemType[] = items;

    if (skeleton) nodes.push(...[
        { node: { id: '1', name: '' }},
        { node: { id: '2', name: '' }},
        { node: { id: '3', name: '' }},
        { node: { id: '4', name: '' }},
    ]);

    const __onClick = (index: string, event: React.MouseEvent<HTMLButtonElement>) => {
        onActiveItemChanged(index, event);
    }

    return (
        <List items={nodes} className={classes['tab__list']}>
            {
                ({ node: { id, name, avatarURL, active }}: ItemType) => (
                    <Grid
                        key={id}
                        alignItems='center'
                        direction='row'
                        wrap='nowrap'
                        justify='space-between'
                        className={classes['list-item']}
                    >
                        {
                            skeleton ? 
                            <Skeleton width='100%' height='60px' /> :
                            <Button
                                className={classNames(
                                    classes['list-item__btn'], 
                                    { [classes['list-item__btn_skeleton']]: skeleton }, 
                                    { [classes['list-item__btn_active']]: active }, 
                                )}
                                onClick={__onClick.bind(this, id)}
                            >
                                <Grid alignItems='center' className={classes['list-item__header']}>
                                    <div className={classes['list-item__avatar']}>
                                        <div className={classes['list-item__image']}>
                                                {
                                                    avatarURL ? 
                                                    <img className={classes['list-item__image']} src={avatarURL} alt=""/> :
                                                    <span>{name.length > 0 ? name[0].toUpperCase() : 'U'}</span>
                                                }
                                        </div>
                                        <span className={classes['list-item__status']}>
                                            <span className={classes['list-item__online-status']}></span>
                                        </span>
                                    </div>
                                    <p className={classes['list-item__title']}>{name}</p>
                                </Grid>
                            </Button>
                        }
                    </Grid>
                )
            }
        </List>
    )
}

export default DialogList;