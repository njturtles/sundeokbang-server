import {
  Controller,
  Query,
  Get,
  Put,
  Param,
  Body,
  Post,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  //유저조회
  @Get('users/list')
  async listUsers(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<{ rows: any[]; count: number }> {
    return this.mockService.listUsers(page, size);
  }

  //원룸조회
  @Get('rooms/list')
  async listRooms(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<{ rows: any[]; count: number }> {
    return this.mockService.listRooms(page, size);
  }

  // 특정원룸 조회
  @Get('rooms/:id')
  async getRoomDetail(@Param('id') id: string): Promise<any> {
    // id를 숫자로 변환
    // 변환하는 이유는 service에서 데이터를 생성할때 숫자1이 아닌 문자열 1로 인식해서 숫자형으로 바꿈
    const roomId = parseInt(id, 10);

    // 숫자로 변환하지 못한 경우 예외 처리
    if (isNaN(roomId)) {
      throw new NotFoundException('숫자형 변환이 안됨');
    }

    const room = await this.mockService.getRoomById(roomId);

    if (!room) {
      throw new NotFoundException(`${roomId}에 대한 정보를 찾을 수 없음`);
    }

    return room;
  }

  //회원정보 수정
  @Put('users/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: Partial<any>,
  ): Promise<any> {
    return this.mockService.updateUser(id, userData);
  }

  //회원가입
  @Post('users')
  async createUser(@Body() userData: any): Promise<any> {
    return this.mockService.createUser(userData);
  }

  //즐겨찾기 추가
  @Post('favorites')
  async addFavorite(
    @Body('userId') userId: number,
    @Body('roomId') roomId: number,
  ): Promise<string> {
    await this.mockService.addFavorite(userId, roomId);
    return `유저 ${userId}가 방 ${roomId}를 즐겨찾기 하였습니다.`;
  }

  // 즐겨찾기 삭제
  @Delete('favorites')
  async removeFavorite(
    @Query('userId') userId: number,
    @Query('roomId') roomId: number,
  ): Promise<string> {
    await this.mockService.removeFavorite(userId, roomId);
    return `유저 ${userId}가 방 ${roomId}를 즐겨찾기 삭제하였습니다.`;
  }

  // 즐겨찾기 조회
  @Get('favorites/:userId')
  async getFavorites(@Param('userId') userId: number): Promise<number[]> {
    return this.mockService.getFavorite(userId);
  }
}
