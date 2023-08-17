import { FC } from "react";
import { ChatBox } from "./ChatBox.tsx";
import { ChatInput } from "./ChatInput.tsx";
import styled from "styled-components";

const Wrap = styled.div`
  height: 400px;
  width: 400px;
`;

export interface ChatWrapperProps {}

export const ChatWrapper: FC<ChatWrapperProps> = () => {
  return (
    <Wrap>
      <ChatBox list={[]} />
      <ChatInput />
    </Wrap>
  );
};
