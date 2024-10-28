import OpenAI from 'openai';
import ApiError from '../common/res/api.error';
import ApiCodes from '../common/res/api.codes';
import ApiMessages from '../common/res/api.messages';

export default async function callChatbot(
    usermessage: string,
): Promise<string> {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const assistantId = process.env.ASSISTANT_ID;

    const thread = await client.beta.threads.create();

    await client.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: usermessage,
    });

    let run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
    });

    while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        run = await client.beta.threads.runs.retrieve(run.thread_id, run.id);
    }

    if (run.status === 'completed') {
        const messages = await client.beta.threads.messages.list(thread.id);

        const results = messages.data
            .filter((msg) => msg.role !== 'user')
            .map((msg) => {
                const contentBlock = msg.content[0];
                return 'text' in contentBlock ? contentBlock.text.value : '';
            });

        return results.join('\n');
    } else {
        throw new ApiError(ApiCodes.BAD_REQUEST, ApiMessages.BAD_REQUEST, {
            message: '챗봇 응답을 불러올 수 없습니다.',
        });
    }
}
