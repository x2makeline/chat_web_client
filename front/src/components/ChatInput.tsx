import { FC, useCallback } from "react";
import { Button, Form, Input } from "antd";
import { utilSocket } from "../lib/socket.ts";
import { Chat } from "../@types/Chat.ts";
import FormItem from "antd/es/form/FormItem";
import styled from "styled-components";

interface Inputs {
  test: string;
}

export interface ChatInputProps {
  onEmit?: (chat: Chat) => void;
}

const StyledForm = styled<typeof Form<Inputs>>(Form)`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled<typeof FormItem<Inputs>>(FormItem)`
  flex-grow: 1 !important;
  margin-inline-end: 0 !important;
  margin: 0;
`;

const StyledSubmitBtn = styled<typeof Button>(Button)`
  width: 70px;
  margin: 0;
`;

export const ChatInput: FC<ChatInputProps> = ({ onEmit }) => {
  const [form] = Form.useForm<Inputs>();

  const onSendMessage = useCallback((e: Inputs) => {
    utilSocket.emitMessage(e.test, onEmit);
    form.setFieldValue("test", "");
  }, []);

  return (
    <StyledForm form={form} layout="inline" onFinish={onSendMessage} style={{}}>
      <StyledInput name={"test"}>
        <Input type="text" autoComplete={"off"} />
      </StyledInput>
      <FormItem
        style={{
          margin: 0,
        }}
      >
        <StyledSubmitBtn htmlType={"submit"}>보내기</StyledSubmitBtn>
      </FormItem>
    </StyledForm>
  );
};
