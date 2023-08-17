import { io } from "socket.io-client";
import { Chat } from "../@types/Chat.ts";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export type MessageCallback = (chat: Chat) => void;
export const utilSocket = new (class UtilSocket {
  private readonly _MESSAGE_EV = "message";

  get id(): string {
    return socket.id;
  }

  onMessage(cb: MessageCallback) {
    socket.on(this._MESSAGE_EV, cb);
  }

  offMessage(cb: MessageCallback) {
    socket.off(this._MESSAGE_EV, cb);
  }

  emitMessage(text: string, cb?: MessageCallback) {
    socket.emit(this._MESSAGE_EV, text, cb);
  }
})();
