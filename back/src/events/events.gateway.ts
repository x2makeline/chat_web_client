import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import dayjs from 'dayjs';

interface Msg {
  text: string;
  createdBy?: string;
  createdAt: number;
}

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly prismaService: PrismaService) {}

  private logger = new Logger('Gateway');
  @WebSocketServer() nsp: Namespace;

  // 초기화 이후에 실행
  afterInit() {
    this.nsp.adapter.on('create-room', (room) => {
      this.logger.log(`"Room:${room}"이 생성되었습니다.`);
    });

    this.nsp.adapter.on('join-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    });

    this.nsp.adapter.on('leave-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    this.nsp.adapter.on('delete-room', (roomName) => {
      this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
    });
    this.nsp.on('message', (a) => {
      this.logger.log(`message ${JSON.stringify({ a })}`);
    });

    this.nsp.adapter.on('message', (a) => {
      this.logger.log(`message ${JSON.stringify({ a })}`);
    });

    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결`);

    socket.on('message', async (message) => {
      await this.prismaService.message.create({
        data: {
          createdUserId: socket.id,
          text: message || '',
          createdAt: dayjs().toDate(),
        },
      });
    });
    socket.broadcast.emit('message', {
      text: `${socket.id}가 들어왔습니다.`,
      createdBy: socket.id,
    } as Msg);

    await this.prismaService.user.create({
      data: {
        id: socket.id,
      },
    });
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);

    socket.broadcast.emit('message', {
      text: `${socket.id}가 나갔습니다.`,
      createdBy: socket.id,
    } as Msg);

    this.prismaService.user.update({
      data: {
        deletedAt: dayjs().toDate(),
      },
      where: {
        id: socket.id,
      },
    });
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: string,
  ): Msg {
    console.log('handleMessage', message);
    const msg: Msg = {
      text: message,
      createdBy: socket.id,
      createdAt: dayjs().valueOf(),
    };
    socket.broadcast.emit('message', msg);

    return msg;
  }
}
