import { Injectable } from '@nestjs/common';
// import { User } from '../entities/user.entity';
import {Cat} from '../types/cat.interface'

/**
 * controller 데시 보드 만들기
 * - provider : Injectable 데코레이트 된 모든 것이 서비스 될수 있다 .
 *
 * - module : 종속성을 묶어주는 역활이고
 **/

@Injectable()
export class AdminService {

  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  getHello(): string {
    return '서비스 만들기';
  }
}
