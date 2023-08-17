import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { utilSocket } from "./lib/socket.ts";
import { Chat } from "./@types/Chat.ts";

interface Inputs {
  test: string;
}

const App = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const chatContainerEl = useRef<HTMLDivElement>(null);

  // 채팅이 길어지면(chats.length) 스크롤이 생성되므로, 스크롤의 위치를 최근 메시지에 위치시키기 위함
  useEffect(() => {
    if (!chatContainerEl.current) return;

    const chatContainer = chatContainerEl.current;
    const { scrollHeight, clientHeight } = chatContainer;

    if (scrollHeight > clientHeight) {
      chatContainer.scrollTop = scrollHeight - clientHeight;
    }
  }, [chats.length]);

  // message event listener
  useEffect(() => {
    const messageHandler = (chat: Chat) => {
      console.log("messageHandler", chat);
      setChats((prevChats) => [...prevChats, chat]);
    };

    utilSocket.onMessage(messageHandler);
    return () => {
      utilSocket.offMessage(messageHandler);
    };
  }, []);

  const onSendMessage = useCallback((e: Inputs) => {
    console.log("onSendMessage", e);
    utilSocket.emitMessage(e.test, (chat: Chat) => {
      console.log("emitMessage", chat);
      setChats((prevChats) => [...prevChats, chat]);
    });
  }, []);

  return (
    <>
      <h1>{`WebSocket Chat : ${utilSocket.id}`}</h1>
      <div ref={chatContainerEl}>
        {chats.map((chat, index) => (
          <div key={index}>
            <div className="message">{`${chat.createdBy} : ${chat.text}`}</div>
          </div>
        ))}
      </div>
      <Form<Inputs> onFinish={onSendMessage}>
        <Form.Item name={"test"} rules={[{ required: true, message: "메" }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item>
          <Button htmlType={"submit"}>보내기</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
