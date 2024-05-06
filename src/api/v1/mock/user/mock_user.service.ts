import { Injectable } from '@nestjs/common';

@Injectable()
export class MockUserService {
  async list(
    page: number,
    size: number,
  ): Promise<{ rows: any[]; count: number }> {
    const rows = [
      {
        id: 1,
        name: '서기문',
        email: 'gimun08@naver.com',
        password: 'scnu20211207',
        phone: '01068603458',
        school: '순천대학교',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: '정다운',
        email: 'ekdns@naver.com',
        password: 'scnu1111',
        phone: '010-9957-8220',
        school: '순천대학교',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return { rows, count: rows.length };
  }
}
