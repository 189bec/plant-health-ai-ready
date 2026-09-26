import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Activity } from 'lucide-react';

const BioelectricChart = ({ data, currentVoltage }) => {
  const [viewMode, setViewMode] = useState('live'); // 'live' or 'history'
  const [historyData, setHistoryData] = useState([]);
  
  useEffect(() => {
    if (viewMode === 'history') {
      fetch('http://localhost:8000/api/sensors/history')
        .then(res => res.json())
        .then(res => {
          if (res.success) setHistoryData(res.data);
        })
        .catch(err => console.error("Error fetching history", err));
    }
  }, [viewMode]);
  
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-terracotta-100 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-terracotta-800 flex items-center gap-2">
            <Activity size={20} className="text-terracotta-600" /> Bioelectric Signal
          </h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('live')}
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${viewMode === 'live' ? 'bg-terracotta-100 text-terracotta-800 border-terracotta-200' : 'bg-gray-50 text-gray-500'}`}
          >
            <div className={`w-2 h-2 rounded-full ${viewMode === 'live' ? 'bg-terracotta-600 animate-pulse' : 'bg-gray-400'}`}></div>
            Live
          </button>
          <button 
            onClick={() => setViewMode('history')}
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${viewMode === 'history' ? 'bg-sage-100 text-sage-800 border-sage-200' : 'bg-gray-50 text-gray-500'}`}
          >
            <Clock size={12} />
            5-Day Drift
          </button>
        </div>
      </div>

      {viewMode === 'live' ? (
        <>
          <div className="flex gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 font-medium">Current</p>
              <p className="text-lg font-bold text-gray-900">{currentVoltage} V</p>
            </div>
            <div>
              <p className="text-xs text-sage-600 font-bold bg-sage-50 px-2 py-0.5 rounded">Real-time Graphite Electrode</p>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${Number(value).toFixed(3)} V`, 'Voltage']}
                  labelFormatter={() => ''}
                />
                <Line 
                  type="monotone" 
                  dataKey="voltage" 
                  stroke="#cc6a4b" 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-4 mb-4">
             <p className="text-xs text-gray-600">Showing the plant's baseline drift as we deliberately withheld water over 5 days. Note the upward drift indicating stress.</p>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="timestamp" hide />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value, name) => [Number(value).toFixed(2), name === 'electrode_voltage' ? 'Voltage (V)' : 'Moisture (%)']}
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="electrode_voltage" 
                  stroke="#cc6a4b" 
                  strokeWidth={2} 
                  dot={false}
                  name="electrode_voltage"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default BioelectricChart;
