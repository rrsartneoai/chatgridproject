import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Brain, AlertCircle, KeyRound } from 'lucide-react';
import { analyzeGridMetrics, AIError } from '../services/ai';
import { useGridStore } from '../store/gridStore';

export default function AIInsights() {
  const metrics = useGridStore((state) => state.metrics);
  
  const { data: insights, isLoading, error } = useQuery({
    queryKey: ['gridInsights', metrics],
    queryFn: () => analyzeGridMetrics(metrics),
    refetchInterval: 300000, // Refresh every 5 minutes
    retry: (failureCount, error) => {
      // Only retry if it's not an API key error
      return (error as AIError)?.code !== 'NO_API_KEY' && failureCount < 2;
    },
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
        </div>
      );
    }

    if (error) {
      const aiError = error as AIError;
      return (
        <div className="flex items-start gap-3 text-amber-600 bg-amber-50 p-4 rounded-lg">
          {aiError.code === 'NO_API_KEY' ? (
            <KeyRound className="h-5 w-5 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 mt-0.5" />
          )}
          <div>
            <p className="font-medium">Configuration Required</p>
            <p className="text-sm mt-1">{aiError.message}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-600">{insights}</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-semibold">AI Insights</h3>
      </div>
      <div className="min-h-[100px]">
        {renderContent()}
      </div>
    </div>
  );
}