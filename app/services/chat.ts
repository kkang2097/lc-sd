import type { MessageProps } from '../components/Message';
import { Node, Edge } from 'reactflow';

export async function sendMessageToChatGPT(messages: MessageProps[], nodes: Node[], edges: Edge[], content: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, nodes, edges, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from ChatGPT');
    }

    const data = await response.json();
    return data.message;
  } catch (error: unknown) {
    console.error('Error sending message to ChatGPT:', error);
    throw error;
  }
} 