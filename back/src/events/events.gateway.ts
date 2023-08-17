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

    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결`);
    socket.broadcast.emit('message', {
      message: `${socket.id}가 들어왔습니다.`,
    });

    await this.prismaService.user.create({
      data: {
        id: socket.id,
      },
    });
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);

    socket.broadcast.emit('message', {
      message: `${socket.id}가 나갔습니다.`,
    });

    await this.prismaService.user.update({
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
  ) {
    socket.broadcast.emit('message', { username: socket.id, message });
    this.logger.log(
      `message ${JSON.stringify({ username: socket.id, message })}`,
    );
    return { username: socket.id, message };
  }
}
