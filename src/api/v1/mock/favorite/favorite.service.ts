import { Injectable } from '@nestjs/common';

@Injectable()
export class MockFavoriteService {
  async list(
    page: number,
    size: number,
  ): Promise<{ rows: any[]; count: number }> {
    const rows = [
      {
        id: 1,
        user: 1,
        room: 1,
      },
    ];
    return { rows, count: rows.length };
  }
}
