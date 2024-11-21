import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface Message {
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response - Replace with actual RAG implementation
      setTimeout(() => {
        const assistantMessage: Message = {
          content: getSimulatedResponse(input),
          type: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting response:', error);
      setIsLoading(false);
    }
  };

  const getSimulatedResponse = (query: string): string => {
    const responses = {
      default: "I can help you monitor and analyze the smart grid system. What would you like to know?",
      load: "The current grid load is 4.2 MW, which is within normal operating parameters. We're seeing a 2.5% increase from the last hour.",
      battery: "Battery storage is at 85% capacity, showing a slight decrease of 1.2% in the last hour due to increased demand.",
      wind: "Wind generation is currently at 1.8 MW, with turbine efficiency at 92%. This represents a 5.7% increase from the last hour.",
    };

    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('load')) return responses.load;
    if (lowerQuery.includes('battery')) return responses.battery;
    if (lowerQuery.includes('wind')) return responses.wind;
    return responses.default;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col h-[400px]">
      <div className="p-4 border-b flex items-center">
        <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
        <h3 className="font-semibold">Grid Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the grid status..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}