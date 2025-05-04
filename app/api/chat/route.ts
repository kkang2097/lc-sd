import { LlamaAPIClient } from 'llama-api-client';
import { NextResponse } from 'next/server';

const openai = new LlamaAPIClient(
  {
  apiKey: "LLM|1210484940555233|XoEKwHgv9wOTWQUnFjCbV_VhZE0",
//   baseURL: 'https://api.llama.com/v1',
}
);




export async function POST(req: Request) {
  try {
    const { messages, nodes, edges, content } = await req.json();
    console.log(messages, nodes, edges, content);


    const prompt = `
    **ROLE**
    You are a senior staff software engineer at Meta. The user is a software engineer who is
    doing a technical interview. The task is to design a distributed cache system.

    The user has provided you with a graph that describes the system.

    **DATA**
    Here are the nodes and edges of the architecture diagram they're working on:
    NODES:
    {JSON.stringify(nodes)}

    EDGES:
    {JSON.stringify(edges)}

    Here's the user's notes on the system architecture:
    {content}

    **CONVERSATION HISTORY**
    {JSON.stringify(messages)}

    **INSTRUCTIONS**
    The user has also provided you with an image of a distributed cache for you to reference.
    Discrepancies between the given graph (with nodes and edges described) and the image are
    differences in details between the ideal output and the actual output.

    Lastly, here's an image of a distributed cache for you to reference. Discrepancies
    between the given graph (with nodes and edges described) are differences in details between
    the ideal output and the actual output.

    **OUTPUT**
    Return an appropriate text response to the user's input.
    - ALWAYS RESPOND WITH LESS THAN 15 WORDS.
    - If the user is missing details, ask for clarification.
    
    Your output:
`;


    const allMessages = [
      {
        role: 'user',
        content: [
          {"type": "text", "text": prompt},
          // Image of Distributed Cache
          {"type": "image_url", "image_url": {
            "url": "https://miro.medium.com/v2/format:webp/1*3DDetzMbVd7HfLU_xrCCbA.png",
            }},
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