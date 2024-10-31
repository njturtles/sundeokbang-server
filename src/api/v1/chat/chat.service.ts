import { Injectable } from '@nestjs/common';
import callChatbot from 'src/libs/chatbot/chatbot';

@Injectable()
export class ChatService {
    async getChatbotResponse(message: string): Promise<string> {
        const response = await callChatbot(message);
        return response;
    }
}
