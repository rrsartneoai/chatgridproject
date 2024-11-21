import React from 'react';
import { useGridStore } from '../store/gridStore';

export default function StatusUpdates() {
  const updates = useGridStore((state) => state.updates);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="flex items-center space-x-4">
            <div className={`w-2 h-2 rounded-full ${
              update.type === 'success' ? 'bg-green-500' :
              update.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
            }`} />
            <span className="text-sm text-gray-500">{update.time}</span>
            <span className="text-sm">{update.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}