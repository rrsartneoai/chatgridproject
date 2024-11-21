import { useState } from 'react';
import { useGridStore } from '../store/gridStore';
import { analyzeGridMetrics } from '../services/ai';

interface Message {
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([{
    content: "Hello! I'm your Grid Assistant. How can I help you today?",
    type: 'assistant',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const metrics = useGridStore((state) => state.metrics);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await analyzeGridMetrics({
        ...metrics,
        userQuery: input,
      });

      const assistantMessage: Message = {
        content: response,
        type: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        content: 'I apologize, but I encountered an error. Please try again.',
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
  };
}