import React from 'react';
import { Wind, Factory, Home, Zap } from 'lucide-react';

export default function GridMap() {
  return (
    <div className="relative h-[400px] bg-slate-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1548089699-bfad674e5e16?auto=format&fit=crop&q=80&w=2070')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
      
      {/* Grid Elements */}
      <div className="relative h-full p-4">
        <div className="absolute top-1/4 left-1/4">
          <Wind className="text-green-400 h-8 w-8" />
          <span className="text-xs text-white">Wind Farm</span>
        </div>
        <div className="absolute top-1/2 left-1/2">
          <Factory className="text-yellow-400 h-8 w-8" />
          <span className="text-xs text-white">Power Plant</span>
        </div>
        <div className="absolute bottom-1/4 right-1/4">
          <Home className="text-blue-400 h-8 w-8" />
          <span className="text-xs text-white">Residential</span>
        </div>
        {/* Power Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <line x1="25%" y1="25%" x2="50%" y2="50%" className="stroke-white stroke-2 opacity-50" />
          <line x1="50%" y1="50%" x2="75%" y2="75%" className="stroke-white stroke-2 opacity-50" />
        </svg>
      </div>
    </div>
  );
}