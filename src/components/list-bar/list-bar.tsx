import React from 'react';
import Grid from '@ui/grid/grid';
import List from '@ui/list/list';
import Search from '@components/search/search';
import CreateDialog from '@components/dialogs/create-dialog/create-dialog';
import classes from '@components/list-bar/list-bar.module.scss';
import classNames from 'classnames';
import { MenuStateEnum } from '@store/menu';
import { gql, useQuery } from '@apollo/client';
import SideBar from '@components/side-bar/side-bar';
import { GET_DIALOGS, GET_LOCAL_STATE } from './list-bar.graphql';
import Skeleton from '@ui/skeleton/skeleton';
import { currentChatVar } from '@store/chats';
import { useRouter } from 'next/router';

export interface ItemType {
  id: string;
  title: string;
  desc: string;
  time: string;
  messages: number;
  avatarURL: string;
  active: boolean;
}

export interface Props {
  title: string;
  children?: JSX.Element[];
}

export const ListBar: React.FC<Props> = ({ title }) => {
  const router = useRouter();
  const {
    data: {
      localState: { menuState, currentChat: currentChat },
    },
  } = useQuery(GET_LOCAL_STATE);
  const { error, data, loading } = useQuery(GET_DIALOGS, {
    variables: {
      filter: {
        field: {
          name: 'TYPE_NAME',
          op: 'EQUALS',
          val: 'DIALOG',
        },
      },
    },
  });

  const dialogs = [];

  if (!loading && !error) {
    const {
      me: {
        id: userId,
        chats: { edges: chats },
      },
    } = data;
    dialogs.push(
      ...chats.map(
        ({
          node: {
            id,
            members: { edges: members },
          },
        }) => {
          const {
            node: { user: interlocutor },
          } = members.find(({ node: { user } }) => user.id !== userId);
          return {
            id,
            title: interlocutor.name,
            desc: '',
            time: '',
            messages: 0,
            avatarURL: interlocutor.avatarURL,
            active: currentChat === id,
          };
        }
      )
    );
  } else if (!dialogs.length) {
    for (let i = 0; i > 5; ++i) dialogs.push({ id: i });
  }

  return (
    <Grid
      direction="column"
      className={classNames(
        classes['list-bar'],
        {
          [classes['list-bar_show']]: menuState === MenuStateEnum.MOVING_ACTIVE,
        },
        {
          [classes['list-bar_hidden']]:
            menuState === MenuStateEnum.MOVING_DEACTIVE,
        }
      )}
    >
      <Grid direction="column" className={classes['list-bar__header']}>
        <h1 className={classes['list-bar__title']}>{title}</h1>
        <Search />
        <Grid
          alignItems="center"
          justify="space-between"
          direction="row"
          className={classes['list-bar__btns']}
        >
          <CreateDialog />
        </Grid>
      </Grid>
      {loading || error ? (
        <List items={dialogs} className={classes['list']}>
          {({ id }) => (
            <Grid
              key={id}
              className={classNames(
                classes['list-item'],
                classes['list-item_skeleton']
              )}
            >
              <Skeleton width="100%" height="60px" />
            </Grid>
          )}
        </List>
      ) : (
        <List items={dialogs} className={classes['list']}>
          {({
            id,
            title,
            desc,
            time,
            messages,
            active,
            avatarURL,
          }: ItemType) => (
            <Grid
              key={id}
              alignItems="center"
              direction="row"
              wrap="nowrap"
              justify="space-between"
              className={classNames(classes['list-item'], {
                [classes['list-item_active']]: active,
              })}
              onClick={() => {
                currentChatVar(id);
                router.push(`/dialogs/${id}`);
              }}
            >
              <Grid
                alignItems="center"
                justify="space-between"
                className={classes['list-item__header']}
              >
                <div className={classes['list-item__avatar']}>
                  <img
                    className={classes['list-item__image']}
                    src={avatarURL}
                    alt=""
                  />
                  <span className={classes['list-item__status']}>
                    <span
                      className={classes['list-item__online-status']}
                    ></span>
                  </span>
                </div>
                <Grid direction="column" className={classes['list-item__text']}>
                  <p className={classes['list-item__title']}>{title}</p>
                  {desc ? (
                    <p className={classes['list-item__desc']}>{desc}</p>
                  ) : null}
                </Grid>
              </Grid>
              <Grid direction="column" className={classes['list-item__info']}>
                {time ? (
                  <p className={classes['list-item__time']}>{time}</p>
                ) : null}
                {messages ? (
                  <p className={classes['list-item__nums']}>
                    <span>{messages}</span>
                  </p>
                ) : null}
              </Grid>
            </Grid>
          )}
        </List>
      )}
      {menuState === MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE ? (
        <SideBar.Horizontal />
      ) : null}
    </Grid>
  );
};

export default ListBar;
