import { FC, useCallback, useEffect, useState } from "react";
import { ChatBox } from "./ChatBox.tsx";
import { ChatInput } from "./ChatInput.tsx";
import styled from "styled-components";
import { Chat } from "../@types/Chat.ts";
import { MessageCallback, utilSocket } from "../lib/socket.ts";

const Wrap = styled.div`
  height: 400px;
  width: 400px;
`;

export interface ChatWrapperProps {}

export const ChatWrapper: FC<ChatWrapperProps> = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const messageHandler = (chat: Chat) => {
      setChats((prevChats) => [...prevChats, chat]);
    };

    utilSocket.onMessage(messageHandler);
    return () => {
      utilSocket.offMessage(messageHandler);
    };
  }, []);

  const onEmit = useCallback<MessageCallback>(
    (chat: Chat) => setChats((prevChats) => [...prevChats, chat]),
    [setChats],
  );

  return (
    <Wrap>
      <ChatBox list={chats} />
      <ChatInput onEmit={onEmit} />
    </Wrap>
  );
};
