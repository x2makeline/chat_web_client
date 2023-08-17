import { Chat } from "../@types/Chat.ts";
import { FC } from "react";
import styled from "styled-components";

export interface ChatBoxProps {
  list: Array<Chat>;
}

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  border: solid black;
`;

export const ChatBox: FC<ChatBoxProps> = ({ list }) => {
  console.log(list);
  return (
    <Wrap>
      {list.map((o, i) => (
        <p key={i}>{o.text}</p>
      ))}
    </Wrap>
  );
};
