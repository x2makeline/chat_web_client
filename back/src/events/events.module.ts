import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [EventsGateway],
  //imports: [PrismaModule],
})
export class EventsModule {}
