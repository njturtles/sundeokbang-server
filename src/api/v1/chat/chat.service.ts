import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import callChatbot from 'src/libs/chatbot/chatbot';

@Injectable()
export class ChatService {
    constructor(private readonly env: ConfigService) {}

    async getChatbotResponse(message: string): Promise<string> {
        const response = await callChatbot(
            message,
            this.env.get<string>('OPENAI_API_KEY'), // 환경 변수에서 API 키 가져오기
        );
        return response;
    }
}
