import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;

interface GridMetrics {
  currentLoad: number;
  batteryStorage: number;
  windGeneration: number;
  userQuery?: string;
}

export class AIError extends Error {
  constructor(message: string, public code: 'NO_API_KEY' | 'API_ERROR') {
    super(message);
    this.name = 'AIError';
  }
}

export async function analyzeGridMetrics(metrics: GridMetrics): Promise<string> {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new AIError(
      'Please configure your Google AI API key in the .env file',
      'NO_API_KEY'
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const context = `You are a helpful AI assistant for a smart grid system. Your name is Grid Assistant.

Instructions:
- Provide natural, conversational responses
- Only include specific metrics when directly asked about them
- Keep responses concise and friendly
- Use a helpful, professional tone
- If asked about specific metrics, you can access:
  * Current Load: ${metrics.currentLoad} MW
  * Battery Storage: ${metrics.batteryStorage}%
  * Wind Generation: ${metrics.windGeneration} MW

Remember: Don't volunteer specific numbers unless asked. Focus on being helpful and conversational.`;

    const prompt = metrics.userQuery || 'Hello';

    const result = await model.generateContent([
      { text: context },
      { text: prompt },
    ]);
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new AIError(
      'Unable to analyze metrics. Please check your API key and try again.',
      'API_ERROR'
    );
  }
}