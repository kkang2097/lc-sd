import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: "LLM|1210484940555233|XoEKwHgv9wOTWQUnFjCbV_VhZE0",
  baseURL: 'https://api.llama.com/v1',
});

const prompt = `
Which llama model are you?
`;


export async function POST(req: Request) {
  try {
    const { messages, nodes, edges, content } = await req.json();
    console.log(messages, nodes, edges, content);


    const allMessages = [
      {
        role: 'user',
        content: [
          {"type": "text", "text": prompt},
          // {"type": "image_url", "image_url": {
          //   "url": "https://miro.medium.com/v2/format:webp/1*3DDetzMbVd7HfLU_xrCCbA.png",
          //   "detail": "high"
          //   }},
        ],
      },
      ...messages.map((msg: any) => ({
        role: msg.userType === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
    ];
    console.log(allMessages);

    const completion = await openai.chat.completions.create({
      messages: allMessages,
      model: 'Llama-4-Maverick-17B-128E-Instruct-FP8',
    });

    // @ts-ignore
    const textOutput = completion.completion_message.content.text;
    console.log(textOutput);

    return NextResponse.json({
      message: textOutput,
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from ChatGPT' },
      { status: 500 }
    );
  }
} 