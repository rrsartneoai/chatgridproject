import React from 'react';

export default function ConsumptionChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Energy Consumption Trend</h3>
      <div className="h-[300px] flex items-end space-x-2">
        {[65, 59, 80, 81, 56, 55, 70].map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
              style={{ height: `${value}%` }}
            />
            <span className="text-xs mt-2 text-gray-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}