import { List as UIList, Grid } from '@ui/ui';
import classes from '@components/list-bar/list-bar.module.scss';
import classNames from 'classnames';
import { LBSkeleton } from './skeleton';
import { useQuery } from '@apollo/client';
import {
  GET_DIALOGS,
  SUBS_CHAT_ADDED,
  GET_LOCAL_STATE,
} from './list-bar.graphql';
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

export interface ListProps {
  dialogs: ItemType[];
}

export const List: React.FC = props => {
  const {} = props;
  const router = useRouter();
  const {
    data: {
      localState: { currentChat },
    },
  } = useQuery(GET_LOCAL_STATE);

  const { subscribeToMore, error, data, loading } = useQuery(GET_DIALOGS, {
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

  if (loading || error) return <LBSkeleton />;

  subscribeToMore({
    document: SUBS_CHAT_ADDED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newChat = { node: subscriptionData.data.CHAT_CREATED_EVENT };

      if (prev.me.chats.edges.find(({ node }) => node.id === newChat.node.id))
        return prev;

      return Object.assign({}, prev, {
        me: {
          ...prev.me,
          chats: {
            ...prev.me.chats,
            edges: [...prev.me.chats.edges, newChat],
          },
        },
      });
    },
  });

  const {
    me: {
      id: userId,
      chats: { edges: chats },
    },
  } = data;

  const items = chats.map(
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
  );

  return (
    <UIList items={items} className={classes['list']}>
      {({ id, title, desc, time, messages, active, avatarURL }: ItemType) => {
        const timeElement = time ? (
          <p className={classes['list-item__time']}>{time}</p>
        ) : null;

        const messageElement = messages ? (
          <p className={classes['list-item__nums']}>
            <span>{messages}</span>
          </p>
        ) : null;

        const descElement = desc ? (
          <p className={classes['list-item__desc']}>{desc}</p>
        ) : null;

        return (
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
                  <span className={classes['list-item__online-status']}></span>
                </span>
              </div>
              <Grid direction="column" className={classes['list-item__text']}>
                <p className={classes['list-item__title']}>{title}</p>
                {descElement}
              </Grid>
            </Grid>
            <Grid direction="column" className={classes['list-item__info']}>
              {timeElement}
              {messageElement}
            </Grid>
          </Grid>
        );
      }}
    </UIList>
  );
};

export default List;
