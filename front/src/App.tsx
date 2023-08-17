import classNames from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button, Form, Input } from "antd";

const socket = io("http://localhost:3000/chat");

interface Inputs {
  test: string;
}

interface IChat {
  username: string;
  message: string;
}

const App = () => {
  const [chats, setChats] = useState<IChat[]>([]);
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
    const messageHandler = (chat: IChat) =>
      setChats((prevChats) => [...prevChats, chat]);
    socket.on("message", messageHandler);

    return () => {
      socket.off("message", messageHandler);
    };
  }, []);

  const onSendMessage = useCallback((e: Inputs) => {
    console.log("onSendMessage", e);
    socket.emit("message", e.test, (chat: IChat) => {
      setChats((prevChats) => [...prevChats, chat]);
    });
  }, []);

  return (
    <>
      <h1>WebSocket Chat</h1>
      <div ref={chatContainerEl}>
        {chats.map((chat, index) => (
          <div
            key={index}
            className={classNames({
              my_message: socket.id === chat.username,
              alarm: !chat.username,
            })}
          >
            <span>
              {chat.username
                ? socket.id === chat.username
                  ? ""
                  : chat.username
                : ""}
            </span>
            <div className="message">{chat.message}</div>
          </div>
        ))}
      </div>
      <Form<Inputs> onFinish={onSendMessage}>
        <Form.Item name={"test"}>
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
