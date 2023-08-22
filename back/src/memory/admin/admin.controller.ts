import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

/**
 * template html
 * static path public 만들기 view 파일경로를 만들기
 */
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(["/","/index"])
  getHello(): string {
    return this.adminService.getHello();
  }
}
