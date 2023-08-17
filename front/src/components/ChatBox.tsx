import { Typography } from "antd";
import { Chat } from "../@types/Chat.ts";
import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { utilSocket } from "../lib/socket.ts";

export interface ChatBoxProps {
  list: Array<Chat>;
}

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  border: solid black;
  overflow: auto;
`;

export const ChatBox: FC<ChatBoxProps> = ({ list }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      if (clientHeight < scrollHeight) {
        ref.current.scrollTop = scrollHeight - clientHeight;
      }
    }
  }, [list]);
  return (
    <Wrap ref={ref}>
      {list.map((chat, i) => (
        <div
          key={i}
          style={{
            textAlign:
              chat.createdBy === utilSocket.socket.id ? "right" : "left",
          }}
        >
          <Typography.Text strong>{chat.createdBy}</Typography.Text>
          <br />
          <span>{chat.text}</span>
        </div>
      ))}
    </Wrap>
  );
};
