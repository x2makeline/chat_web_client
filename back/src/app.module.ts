import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import {ChatModule} from "./memory/chat/chat.module";
import {AdminController} from "./memory/admin/admin.controller";
import {AdminModule} from "./memory/admin/admin.module";

@Module({
  // imports: [PrismaModule, EventsModule],
  imports: [ ChatModule,AdminModule],
  controllers: [AppController,AdminController],
  providers: [AppService],
})
export class AppModule {}
