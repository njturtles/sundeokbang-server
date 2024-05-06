import { Controller, Get, Query } from '@nestjs/common';
import { MockRoomService } from './mock_room.service';

@Controller('mockroom')
export class MockRoomController {
  constructor(private readonly mockService: MockRoomService) {}

  @Get('list') //원룸리스트 출력
  async list(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<{ rows: any[]; count: number }> {
    return this.mockService.list(page, size);
  }
}
