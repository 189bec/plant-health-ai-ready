import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BioelectricChart = ({ data, currentVoltage }) => {
  const [timeRange, setTimeRange] = useState('1 min');
  
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            ⚡ Bioelectric Signal
          </h2>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-green-700">Live</span>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 font-medium">Current</p>
          <p className="text-lg font-bold text-gray-900">{currentVoltage} V</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Peak</p>
          <p className="text-lg font-bold text-gray-900">1.97 V</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Minimum</p>
          <p className="text-lg font-bold text-gray-900">1.81 V</p>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="time" hide />
            <YAxis domain={[1.75, 2.05]} tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${Number(value).toFixed(2)} V`, 'Voltage']}
              labelFormatter={() => ''}
            />
            <Line 
              type="monotone" 
              dataKey="voltage" 
              stroke="#eab308" 
              strokeWidth={2} 
              dot={false}
              isAnimationActive={false} // Disable animation for smoother live updates
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-2 mt-4 self-end">
        {['1 min', '5 min', '15 min', '1 hour'].map(range => (
          <button 
            key={range}
            onClick={() => setTimeRange(range)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
              timeRange === range ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BioelectricChart;
