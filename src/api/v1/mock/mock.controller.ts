import { Controller, Query } from '@nestjs/common';
import { MockService } from './mock.service';
import { Get } from '@nestjs/common';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get('list')
  async list(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<{ rows: any[]; count: number }> {
    return this.mockService.list(page, size);
  }
}
