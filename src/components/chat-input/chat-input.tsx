import React, { useRef } from 'react';
import classes from '@components/chat-input/chat-input.module.scss';
import Grid from '@ui/grid/grid';
import Button from '@ui/button/button';
import ClipIcon from '@public/paper-clip.svg';
import PlaneIcon from '@public/paper-plane.svg';
import CameraIcon from '@public/camera.svg';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CURRENT_CHAT, SEND_MESSAGE } from './chat-input.graphql';

export interface Props {
  className?: string;
}

export const ChatInput: React.FC<Props> = ({ className }: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const getCurrentChatQuery = useQuery(GET_CURRENT_CHAT);

  function __handleAddMessageBtnClick() {
    __handleAddMessage();
  }

  function __handleAddMessageInputKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') __handleAddMessage();
  }

  function __handleAddMessage() {
    const messageText = ref.current.value;

    if (!messageText.length) {
      console.error('The message field is empty');
      return;
    }

    if (getCurrentChatQuery.loading || getCurrentChatQuery.error) {
      console.error('The current was not get');
      return;
    }

    sendMessage({
      variables: {
        payload: {
          chatId: getCurrentChatQuery.data.localState.currentChat,
          text: messageText,
        },
      },
    }).catch(e => console.error(e));

    ref.current.value = '';
  }

  return (
    <Grid alignItems="center" className={classes['chat-input']}>
      <Button className={classes['chat-input__btn']}>
        <ClipIcon className={classes['btn__icon']} />
      </Button>
      <Button className={classes['chat-input__btn']}>
        <CameraIcon className={classes['btn__icon']} />
      </Button>
      <input
        ref={ref}
        type="text"
        className={classes['chat-input__input']}
        placeholder="Type your message"
        onKeyPress={__handleAddMessageInputKeyPress.bind(this)}
      />
      <Button
        className={classes['chat-input__btn']}
        onClick={__handleAddMessageBtnClick.bind(this)}
      >
        <PlaneIcon className={classes['btn__icon']} />
      </Button>
    </Grid>
  );
};

export default ChatInput;
