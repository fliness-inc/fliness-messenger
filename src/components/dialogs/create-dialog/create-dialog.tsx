import React, { useState } from 'react';
import Dialog, { DialogContent } from '@ui/dialog/dialog';
import Grid from '@ui/grid/grid';
import Tabs, { Tab, TabPanel } from '@ui/tabs/tabs';
import Button from '@ui/button/button';
import List from '@ui/list/list';
import classes from '@components/dialogs/create-dialog/create-dialog.module.scss';
import classNames from 'classnames';
import { useQuery } from '@apollo/client';
import { GET_FRIENDS, GET_USERS } from '@components/dialogs/create-dialog/create-dialog.graphql';
import Skeleton from '@ui/skeleton/skeleton';

export interface ItemType {
    node: {
        id: string
        name: string
        avatarURL?: string
    }
}

export interface DialogListProps {
    items: ItemType[],
    skeleton?: boolean
}

export const DialogList: React.FC<DialogListProps> = ({
    items,
    skeleton = false
}: DialogListProps) => {
    const nodes: ItemType[] = items;

    if (skeleton) nodes.push(...[
        { node: { id: '1', name: '' }},
        { node: { id: '2', name: '' }},
        { node: { id: '3', name: '' }},
        { node: { id: '4', name: '' }},
    ]);

    return (
        <List items={nodes} className={classes['tab__list']}>
            {
                ({ node: { id, name, avatarURL }}: ItemType) => (
                    <Grid
                        key={id}
                        alignItems='center'
                        direction='row'
                        wrap='nowrap'
                        justify='space-between'
                        className={classNames(
                            classes['list-item'], 
                            { [classes['list-item_skeleton']]: skeleton }, 
                            { [classes['list-item_active']]: false }, 
                        )}
                    >
                        {
                            skeleton ? 
                            <Skeleton width={250} height={60} /> :
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
                                    <p className={classes['list-item__title']}>{name}</p>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                )
            }
        </List>
    )
}

export const CreateDialog: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState<number>(1);

    const handleTabIndexChange = (index: number) => setTabIndex(index);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getUsersQuery = useQuery(GET_USERS);
    const getFreindsQuery = useQuery(GET_FRIENDS);

    if (getUsersQuery.error) alert(getUsersQuery.error);
    if (getFreindsQuery.error) alert(getFreindsQuery.error);

    return (
        <>
            <Button variant='outlined' onClick={handleClickOpen} className={classes['btn']}>
                New dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent className={classes['create-dialog-form']}>
                    <h1 className={classes['create-dialog-form__title']}>Create a Dialog</h1>

                    <Grid alignItems='center' justify='center'>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabIndexChange}
                            className={classes['create-dialog-form__tabs']}
                        >
                            <Tab index={1}>
                                <p className={classes['tab__title']}>All Users</p>
                            </Tab>
                            <Tab index={2}>
                                <p className={classes['tab__title']}>Friends</p>
                            </Tab>
                        </Tabs>
                    </Grid>
                        
                    <TabPanel 
                        value={tabIndex} 
                        index={1} 
                        className={classes['tab-panel__list']}
                    >
                        {
                            getUsersQuery.loading ? 
                            <DialogList items={[]} skeleton /> :   
                            <DialogList items={getUsersQuery.data.users.edges} /> 
                        }
                    </TabPanel>

                    <TabPanel 
                        value={tabIndex} 
                        index={2}
                        className={classes['tab-panel__list']}
                    >
                       {
                            getFreindsQuery.loading ? 
                            <DialogList items={[]} skeleton /> :   
                            <DialogList items={getFreindsQuery.data.me.friends.edges} /> 
                        }
                    </TabPanel>

                    <Grid 
                        alignItems='center'
                        justify='flex-end'
                        className={classes['create-dialog-form__btns']}
                    >
                        <Button className={classes['btn-cancel']} onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' className={classes['btn-create']} onClick={handleClose}>Create</Button>
                    </Grid>
                </DialogContent>
                    
            </Dialog>
        </>
    );
};

export default CreateDialog;