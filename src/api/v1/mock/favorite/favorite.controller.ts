import { Controller, Get, Query } from '@nestjs/common';
import { MockFavoriteService } from './favorite.service';

@Controller('mockfavorite')
export class MockFavoriteController {
  constructor(private readonly mockService: MockFavoriteService) {}

  @Get('list') // 즐겨찾기 조회
  async list(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<{ rows: any[]; count: number }> {
    return this.mockService.list(page, size);
  }
}
