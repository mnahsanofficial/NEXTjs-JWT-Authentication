import OpenAI from 'openai';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getAIResponse = async (message: string): Promise<{ 
  response: string; 
  remaining: number 
}> => {
const res = await fetch(`${API_URL}/api/text-converter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to get AI response');
  }

  return {
    response: data.data,
    remaining: data.remaining
  };
};
