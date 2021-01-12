import React, { useState } from 'react';
import Dialog, { DialogContent } from '@ui/dialog/dialog';
import Grid from '@ui/grid/grid';
import Tabs, { Tab, TabPanel } from '@ui/tabs/tabs';
import Button from '@ui/button/button';
import List from '@ui/list/list';
import classes from '@components/dialogs/create-dialog/create-dialog.module.scss';
import classNames from 'classnames';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FRIENDS, GET_USERS, CREATE_DIALOG } from '@components/dialogs/create-dialog/create-dialog.graphql';
import Skeleton from '@ui/skeleton/skeleton';
import Progress from '@ui/progress/progress';

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
                                        <img className={classes['list-item__image']} src={avatarURL} alt=""/>
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

export const CreateDialog: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState<number>(1);
    const [activeItemIndex, setActiveItemIndex] = useState<string | null>(null);

    const handleTabIndexChange = (index: number) => setTabIndex(index);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [createDialog] = useMutation(CREATE_DIALOG)
    const getUsersQuery = useQuery(GET_USERS);
    const getFreindsQuery = useQuery(GET_FRIENDS);

    if (getUsersQuery.error) console.error(getUsersQuery.error);
    if (getFreindsQuery.error) console.error(getFreindsQuery.error);

    const handleActiveItemChanged = (index: string) => setActiveItemIndex(index);
    const handleCreateButtonClike = () => {
        if (!activeItemIndex) {
            console.error('Item is not selected');
            return;
        }

        setLoading(true);

        createDialog({
            variables: {
                payload: {
                    type: 'DIALOG',
                    userIds: [ activeItemIndex ]
                }
            }
        })
        .then(({ errors }) => {
            if (errors) {
                console.error(errors);
                return;
            }
            setOpen(false);
        })
        .catch(e => console.error(e))
        .finally(() => setLoading(false));
    }

    return (
        <React.Fragment>
            <Button variant='outlined' onClick={handleClickOpen} className={classes['btn']}>
                New dialog
            </Button>
            <Dialog
                open={open}
                lock={loading}
                onClose={handleClose}
            >
                {
                    loading ? 
                    <DialogContent className={classes['create-dialog-form']}>
                        <Grid 
                            alignItems='center'
                            justify='center'
                            direction='column'
                            className={classes['create-dialog-form__progress']}
                        >
                            <Progress.Circular /> 
                        </Grid>
                    </DialogContent> : 
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
                                getUsersQuery.loading || getUsersQuery.error ? 
                                <DialogList items={[]} skeleton /> :   
                                <DialogList 
                                    items={getUsersQuery.data.users.edges.map(({ node }) => ({
                                        node: {
                                            ...node,
                                            active: node.id === activeItemIndex
                                        }
                                    }))} 
                                    onActiveItemChanged={handleActiveItemChanged}
                                /> 
                            }
                        </TabPanel>

                        <TabPanel 
                            value={tabIndex} 
                            index={2}
                            className={classes['tab-panel__list']}
                        >
                        {
                                getFreindsQuery.loading || getFreindsQuery.error ? 
                                <DialogList items={[]} skeleton /> :   
                                <DialogList 
                                    items={getFreindsQuery.data.me.friends.edges} 
                                    onActiveItemChanged={handleActiveItemChanged}
                                /> 
                            }
                        </TabPanel>

                        <Grid 
                            alignItems='center'
                            justify='flex-end'
                            className={classes['create-dialog-form__btns']}
                        >
                            <Button className={classes['btn-cancel']} onClick={handleClose}>Cancel</Button>
                            <Button variant='contained' className={classes['btn-create']} onClick={handleCreateButtonClike}>Create</Button>
                        </Grid>
                    </DialogContent>
                }
            </Dialog>
        </React.Fragment>
    );
};

export default CreateDialog;