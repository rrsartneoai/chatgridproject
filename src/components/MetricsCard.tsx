import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change: number;
  Icon: LucideIcon;
}

export default function MetricsCard({ title, value, change, Icon }: MetricsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last hour</span>
      </div>
    </div>
  );
}