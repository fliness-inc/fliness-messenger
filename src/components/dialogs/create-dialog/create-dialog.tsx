import React, { useState } from 'react';
import Dialog, { DialogContent } from '@ui/dialog/dialog';
import Grid from '@ui/grid/grid';
import Tabs, { Tab, TabPanel } from '@ui/tabs/tabs';
import Button from '@ui/button/button';
import classes from '@components/dialogs/create-dialog/create-dialog.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_FRIENDS,
  GET_USERS,
  CREATE_DIALOG,
} from '@components/dialogs/create-dialog/create-dialog.graphql';
import Progress from '@ui/progress/progress';
import DialogListWrapper from './list-wrapper/list-wrapper';

export const CreateDialog: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [activeItemIndex, setActiveItemIndex] = useState<string | null>(null);

  const handleTabIndexChange = (index: number) => setTabIndex(index);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createDialog] = useMutation(CREATE_DIALOG);
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
          userIds: [activeItemIndex],
        },
      },
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
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className={classes['btn']}
      >
        New dialog
      </Button>
      <Dialog open={open} lock={loading} onClose={handleClose}>
        {loading ? (
          <DialogContent className={classes['create-dialog-form']}>
            <Grid
              alignItems="center"
              justify="center"
              direction="column"
              className={classes['create-dialog-form__progress']}
            >
              <Progress.Circular />
            </Grid>
          </DialogContent>
        ) : (
          <DialogContent className={classes['create-dialog-form']}>
            <h1 className={classes['create-dialog-form__title']}>
              Create a Dialog
            </h1>

            <Grid alignItems="center" justify="center">
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
              <DialogListWrapper
                loading={getUsersQuery.loading}
                error={getUsersQuery.error !== undefined}
                items={() =>
                  getUsersQuery.data.users.edges.map(({ node }) => ({
                    node: {
                      ...node,
                      active: node.id === activeItemIndex,
                    },
                  }))
                }
                onActiveItemChanged={handleActiveItemChanged}
              />
            </TabPanel>

            <TabPanel
              value={tabIndex}
              index={2}
              className={classes['tab-panel__list']}
            >
              <DialogListWrapper
                loading={getFreindsQuery.loading}
                error={getFreindsQuery.error !== undefined}
                items={() =>
                  getFreindsQuery.data.me.friends.edges.map(({ node }) => ({
                    node: {
                      ...node,
                      active: node.id === activeItemIndex,
                    },
                  }))
                }
                onActiveItemChanged={handleActiveItemChanged}
              />
            </TabPanel>

            <Grid
              alignItems="center"
              justify="flex-end"
              className={classes['create-dialog-form__btns']}
            >
              <Button className={classes['btn-cancel']} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                className={classes['btn-create']}
                onClick={handleCreateButtonClike}
                variant="contained"
                disabled
              >
                Create
              </Button>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default CreateDialog;
