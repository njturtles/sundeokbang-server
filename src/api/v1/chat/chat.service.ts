// src/api/v1/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoomService } from '../room/services/room.service';
import callChatbot from '../../../libs/chatbot/chatbot';
import { getConditions } from '../../../libs/chatbot/getCondition';

@Injectable()
export class ChatService {
    constructor(
        private readonly configService: ConfigService,
        private readonly roomService: RoomService,
    ) {}

    async createChat(message: string): Promise<string> {
        const apiKey = this.configService.get<string>('OPENAI_API_KEY');

        const { minDeposit, maxDeposit, minCost, maxCost } =
            getConditions(message);

        const rooms = await this.roomService.findRoomsByConditions(
            minDeposit,
            maxDeposit,
            minCost,
            maxCost,
        );
        
        const roomDataResponse = rooms.length
            ? rooms
                  .map(
                      (room) =>
                          `방 이름: ${room.name}, 보증금: ${room.deposit}원, 월세: ${room.cost}원`,
                  )
                  .join('\n')
            : '조건에 맞는 방이 없습니다.';

        let chatbotResponse;
        try {
            chatbotResponse = await callChatbot(message, apiKey);
        } catch (error) {
            console.error('Chatbot API call failed:', error);
            chatbotResponse = 'ㅁㄴㅇㄹ';
        }

        return `${chatbotResponse}\n\n${roomDataResponse}`;
    }
}
