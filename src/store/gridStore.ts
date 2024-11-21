import { create } from 'zustand';

interface GridMetrics {
  currentLoad: number;
  batteryStorage: number;
  windGeneration: number;
  lastUpdated: Date;
}

interface GridStore {
  metrics: GridMetrics;
  updates: Array<{
    id: string;
    time: string;
    message: string;
    type: 'success' | 'warning' | 'info';
  }>;
  updateMetrics: (metrics: Partial<GridMetrics>) => void;
  addUpdate: (update: Omit<GridStore['updates'][0], 'id'>) => void;
}

export const useGridStore = create<GridStore>((set) => ({
  metrics: {
    currentLoad: 4.2,
    batteryStorage: 85,
    windGeneration: 1.8,
    lastUpdated: new Date(),
  },
  updates: [
    { id: '1', time: '2 mins ago', message: 'Wind turbine efficiency increased to 92%', type: 'success' },
    { id: '2', time: '15 mins ago', message: 'Substation B switched to backup power', type: 'warning' },
    { id: '3', time: '1 hour ago', message: 'Scheduled maintenance completed', type: 'info' },
  ],
  updateMetrics: (newMetrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics, lastUpdated: new Date() },
    })),
  addUpdate: (update) =>
    set((state) => ({
      updates: [
        { id: Date.now().toString(), ...update },
        ...state.updates.slice(0, 9),
      ],
    })),
}));