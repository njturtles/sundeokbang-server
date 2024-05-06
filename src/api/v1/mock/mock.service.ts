import { Injectable } from '@nestjs/common';

@Injectable()
export class MockService {
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
    ];
    return { rows, count: rows.length };
  }
}
