import React, { useEffect } from 'react';
import { Battery, Zap, Wind } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GridMap from './components/GridMap';
import MetricsCard from './components/MetricsCard';
import ConsumptionChart from './components/ConsumptionChart';
import StatusUpdates from './components/StatusUpdates';
import ChatWidget from './components/ChatWidget';
import { useGridStore } from './store/gridStore';

const queryClient = new QueryClient();

function App() {
  const { metrics, updateMetrics } = useGridStore();

  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics({
        currentLoad: +(metrics.currentLoad + (Math.random() - 0.5) * 0.2).toFixed(2),
        batteryStorage: Math.min(100, Math.max(0, metrics.batteryStorage + (Math.random() - 0.5) * 2)),
        windGeneration: +(metrics.windGeneration + (Math.random() - 0.5) * 0.1).toFixed(2),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [metrics, updateMetrics]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-blue-500" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">SmartGrid Monitor</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">System Online</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricsCard
              title="Current Load"
              value={`${metrics.currentLoad} MW`}
              change={2.5}
              Icon={Zap}
            />
            <MetricsCard
              title="Battery Storage"
              value={`${Math.round(metrics.batteryStorage)}%`}
              change={-1.2}
              Icon={Battery}
            />
            <MetricsCard
              title="Wind Generation"
              value={`${metrics.windGeneration} MW`}
              change={5.7}
              Icon={Wind}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <GridMap />
            <ConsumptionChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatusUpdates />
          </div>
        </main>

        <ChatWidget />
      </div>
    </QueryClientProvider>
  );
}

export default App;