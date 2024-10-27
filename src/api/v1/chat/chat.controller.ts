import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller({ path: 'chat', version: '1' })
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    async createChat(@Body('message') message: string) {
        const result = await this.chatService.getChatbotResponse(message);
        return result;
    }
}
