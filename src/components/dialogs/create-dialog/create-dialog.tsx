import React, { useState } from 'react';
import Dialog, { DialogContent } from '@ui/dialog/dialog';
import Grid from '@ui/grid/grid';
import Tabs, { Tab, TabPanel } from '@ui/tabs/tabs';
import Button from '@ui/button/button';
import List from '@ui/list/list';
import classes from '@components/dialogs/create-dialog/create-dialog.module.scss';
import classNames from 'classnames';

export interface ItemType {
    id: string
    title: string
    avatarURL: string
    active: boolean
}

export interface DialogListProps {
    items: ItemType[]
}

export const DialogList: React.FC<DialogListProps> = ({
    items
}: DialogListProps) => {
    return (
        <List items={items} className={classes['tab__list']}>
            {
                ({ id, title, active, avatarURL }: ItemType) => (
                    <Grid
                        key={id}
                        alignItems='center'
                        direction='row'
                        wrap='nowrap'
                        justify='space-between'
                        className={classNames(
                            classes['list-item'], 
                            active ? classes['list-item_active'] : ''
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
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </List>
    )
}

export const CreateDialog: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState<number>(1);

    const handleTabIndexChange = (index: number) => {
        setTabIndex(index);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const items: ItemType[] = [
        {
            id: '1',
            title: 'Adward Uri',
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '2',
            title: 'Adward Uri',
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        },
        {
            id: '3',
            title: 'Adward Uri',
            avatarURL: 'img/pexels-photo-2613260.jpeg',
            active: false,
        }
    ];

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
                        
                    <TabPanel value={tabIndex} index={1}>
                        <DialogList items={items} />
                    </TabPanel>

                    <TabPanel value={tabIndex} index={2}>
                        <DialogList items={items.slice(0, 2)} />
                    </TabPanel>

                    <Grid 
                        alignItems='center'
                        justify='flex-end'
                    >
                        <Button className={classes['btn-cancel']} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant='contained' className={classes['btn-create']} onClick={() => setOpen(false)}>Create</Button>
                    </Grid>
                </DialogContent>
                    
            </Dialog>
        </>
    );
};

export default CreateDialog;