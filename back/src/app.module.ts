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

/**
 * 미들웨어 선언의 종류 :
 *   1. export class LoggerMiddleware implements NestMiddleware : 클래스 타입
 *   2. export function logger(req: Request, res: Response, next: NextFunction)  : 함수 타입
 *
 * @Module({
 *   imports: [CatsModule],
 * })
 * export class AppModule implements NestModule {
 *   configure(consumer: MiddlewareConsumer) {
 *     consumer
 *       .apply(LoggerMiddleware) // 이 apply()메서드는 단일 미들웨어 또는 여러 인수를 사용하여 여러 미들웨어를 지정할 수 있습니다 . consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
 *       .forRoutes('cats');
 *       .forRoutes({ path: 'cats', method: RequestMethod.GET });
 *       .forRoutes(CatsController);
 *   }
 * }
 */