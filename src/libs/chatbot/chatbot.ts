import OpenAI from 'openai';

export default async function callChatbot(
    usermessage: string,
    apikey: string,
): Promise<string> {
    const client = new OpenAI({ apiKey: apikey });
    const myAssistants = await client.beta.assistants.list();

    const thread = await client.beta.threads.create();
    await client.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: usermessage,
    });

    let run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: myAssistants.data[0].id,
    });

    while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        run = await client.beta.threads.runs.retrieve(run.thread_id, run.id);
        console.log(`Run Status: ${run.status}`);
    }

    const results = [];
    if (run.status === 'completed') {
        const messages = await client.beta.threads.messages.list(thread.id);

        for (const message of messages.data) {
            if (message.role === 'user') break;
            results.push(message);
        }
    } else {
        console.log(`Final Run Status: ${run.status}`);
    }

    const text = results
        .reverse()
        .map((result) => result.content[0].text.value)
        .join('\n');

    return text;
}
