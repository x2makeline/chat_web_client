import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import {ChatModule} from "./memory/chat/chat.module";

@Module({
  // imports: [PrismaModule, EventsModule],
  imports: [ ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
