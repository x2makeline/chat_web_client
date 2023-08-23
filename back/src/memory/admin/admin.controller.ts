import { Controller, Get , Post, Header , Redirect, Query , Param } from '@nestjs/common';
import { AdminService } from './admin.service';

/**
 * - @Request(), @Req()
 * - @Response(), @Res()*
 * - @Next()
 * - @Session()
 * - @Param(key?: string)
 * - @Body(key?: string)
 * - @Query(key?: string)
 * - @Headers(name?: string)
 * - @Ip()
 * - @HostParam()
 *
 * = @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options()
 *
 *  @Header('Cache-Control', 'none')
 *
 * controller 의 정의 endpoint
 *
 * exception
 *   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
 *
 * filter
 * @Catch(HttpException)
 * export class HttpExceptionFilter implements ExceptionFilter {
 *   catch(exception: HttpException, host: ArgumentsHost) {
 *     const ctx = host.switchToHttp();
 *     const response = ctx.getResponse<Response>();
 *     const request = ctx.getRequest<Request>();
 *     const status = exception.getStatus();
 *
 *     response
 *       .status(status)
 *       .json({
 *         statusCode: status,
 *         timestamp: new Date().toISOString(),
 *         path: request.url,
 *       });
 *   }
 * }
 *
 * controller
 * @UseFilters(new HttpExceptionFilter()) : endpoint 함수에 선언
 * @UseFilters(new HttpExceptionFilter()) : controller 에 선언
 * app.useGlobalFilters(new HttpExceptionFilter()); application 에 선언
 *
 * 미들웨어 : logger, cors, helmet
 * 필터는 exception
 * 파이프 : validate
 * guard : Role 정보 : 서비스 접근 정보
 * interceptor : 실행 전후 사용자가 정의한 로직을 구현 ( 오류 , 캐시 , 로깅  )
 * static path public 만들기 view 파일경로를 만들기
 * api / swagger
 *
 */
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // constructor(private catsService: CatsService) {}

  @Get(["/","/index"])
  getHello(): string {
    return this.adminService.getHello();
  }

  @Post()
  @Header('Cache-Control', 'none')
  getPost () : string {
    return 'create new User' ;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  /**
   * @Get(':id')
   * findOne(@Param() params: any): string {
   *   console.log(params.id);
   *   return `This action returns a #${params.id} cat`;
   * }
   */
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  /**
   * @Get()
   * findAll(): Observable<any[]> {
   *   return of([]);
   * }
   */

}
