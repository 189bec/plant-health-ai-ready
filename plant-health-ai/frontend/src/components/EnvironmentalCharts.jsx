import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EnvironmentalCharts = ({ data, currentMoisture, currentWater }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-md font-bold text-gray-800 mb-4">Environmental Monitoring</h2>
      
      <div className="space-y-4">
        {/* Soil Moisture Chart */}
        <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-semibold text-blue-700">Soil Moisture</span>
            <span className="text-sm font-bold text-blue-900">{currentMoisture}%</span>
          </div>
          <div className="h-12 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="moisture" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMoisture)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Level Chart */}
        <div className="bg-cyan-50/50 p-3 rounded-xl border border-cyan-100/50">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-semibold text-cyan-700">Water Level</span>
            <span className="text-sm font-bold text-cyan-900">{currentWater}%</span>
          </div>
          <div className="h-12 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="water" stroke="#06b6d4" fillOpacity={1} fill="url(#colorWater)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default EnvironmentalCharts;
