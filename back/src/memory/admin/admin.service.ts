import { Injectable } from '@nestjs/common';
// import { User } from '../entities/user.entity';

/**
 * controller 데시 보드 만들기
 **/

@Injectable()
export class AdminService {
  getHello() : string{
    return "서비스 만들기" ;
  }
}
