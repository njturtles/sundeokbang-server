import { Controller, Query } from '@nestjs/common';
import { MockUserService } from './mock_user.service';
import { Get } from '@nestjs/common';

@Controller('mockuser')
export class MockUserController {
  constructor(private readonly mockService: MockUserService) {}

  @Get('list') //회원목록을 보여준다
  async list(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<{ rows: any[]; count: number }> {
    return this.mockService.list(page, size);
  }
}
