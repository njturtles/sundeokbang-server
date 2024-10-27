import OpenAI from 'openai';

export default async function callChatbot(
    usermessage: string,
    apikey: string,
): Promise<string> {
    const client = new OpenAI({ apiKey: apikey });

    const assistantId = 'asst_IJjHbVdQsGzN87N0W1lbn0kE';

    const thread = await client.beta.threads.create();

    await client.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: usermessage,
    });

    let run;
    try {
        run = await client.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
        });
    } catch (error: any) {
        console.error(
            'Chatbot API call failed:',
            error.response?.data || error.message,
        );
        return '챗봇 API 호출에 실패했습니다.';
    }

    while (['queued', 'in_progress'].includes(run.status)) {
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
        console.error('Run failed with status:', run.status);
        return '챗봇 응답을 불러올 수 없습니다.';
    }
}
