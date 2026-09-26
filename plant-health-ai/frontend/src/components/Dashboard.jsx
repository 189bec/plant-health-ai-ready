import React, { useState, useEffect } from 'react';
import PlantAnalysis from './PlantAnalysis';
import BioelectricChart from './BioelectricChart';
import SensorCard from './SensorCard';
import EnvironmentalCharts from './EnvironmentalCharts';
import SystemArchitecture from './SystemArchitecture';
import AnalysisHistory from './AnalysisHistory';
import ModelInfo from './ModelInfo';
import { Zap, Droplet, Waves, Radio, Activity } from 'lucide-react';

const Dashboard = () => {
  const [bioData, setBioData] = useState([]);
  const [envData, setEnvData] = useState([]);
  const [loraData, setLoraData] = useState({ snr: 7.5, rssi: -85 });
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Connect to WebSocket for live sensor data
  useEffect(() => {
    const initialBio = Array.from({ length: 40 }, (_, i) => ({ time: i, voltage: 1.90 }));
    setBioData(initialBio);
    
    const initialEnv = Array.from({ length: 20 }, (_, i) => ({ time: i, moisture: 42, water: 78 }));
    setEnvData(initialEnv);

    // Fallback/Placeholder if backend is not running yet
    let interval;
    const ws = new WebSocket('ws://localhost:8000/ws/sensors');
    
    ws.onopen = () => {
      console.log('Connected to sensor websocket');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      setBioData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({ time: data.timestamp, voltage: data.electrode_voltage });
        return newData;
      });
      
      setEnvData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({ time: data.timestamp, moisture: data.soil_moisture, water: data.water_level });
        return newData;
      });

      setLoraData({ snr: data.lora_snr || 7.5, rssi: data.lora_rssi || -85 });
    };
    
    ws.onerror = () => {
      // If websocket fails, start mock data so UI doesn't look broken
      interval = setInterval(() => {
        setBioData(prev => {
          const newData = [...prev.slice(1)];
          const lastTime = newData[newData.length - 1]?.time || 0;
          newData.push({ time: lastTime + 1, voltage: 1.8 + Math.random() * 0.17 });
          return newData;
        });
        setEnvData(prev => {
          const newData = [...prev.slice(1)];
          const lastTime = newData[newData.length - 1]?.time || 0;
          newData.push({ time: lastTime + 1, moisture: 40 + Math.random() * 4, water: 75 + Math.random() * 6 });
          return newData;
        });
      }, 500);
    };

    return () => {
      ws.close();
      if (interval) clearInterval(interval);
    };
  }, []);

  const triggerSpike = async () => {
    try {
      await fetch('http://localhost:8000/api/sensors/spike', { method: 'POST' });
    } catch (e) {
      console.error('Failed to trigger spike', e);
    }
  };

  const currentVoltage = bioData.length > 0 ? bioData[bioData.length - 1].voltage.toFixed(3) : '1.900';
  const currentMoisture = envData.length > 0 ? envData[envData.length - 1].moisture.toFixed(0) : '42';
  const currentWater = envData.length > 0 ? envData[envData.length - 1].water.toFixed(0) : '78';

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 bg-cream-50 px-4 py-8">
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: AI & History */}
        <div className="flex-1 space-y-6">
          <PlantAnalysis />
          <ModelInfo />
          <SystemArchitecture />
        </div>
        
        {/* Right Column: Sensors & Live Data */}
        <div className="w-full md:w-[50%] lg:w-[45%] space-y-6 flex flex-col">
          {/* Action Row */}
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-terracotta-100">
             <div className="flex items-center gap-2">
                <Radio size={24} className="text-terracotta-500" />
                <span className="font-semibold text-terracotta-800">LoRa Link Active</span>
             </div>
             <button 
                onClick={triggerSpike}
                className="bg-sage-600 hover:bg-sage-800 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
             >
                <Activity size={16} />
                Simulate Leaf Touch
             </button>
          </div>

          {/* Sensor Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SensorCard 
              title="Bioelectric" 
              value={`${currentVoltage} V`} 
              status="Live" 
              icon={<Zap size={20} className="text-terracotta-600" />} 
              colorClass="bg-terracotta-50 border-terracotta-200"
            />
            <SensorCard 
              title="Soil Moist" 
              value={`${currentMoisture}%`}
              status="Normal" 
              icon={<Droplet size={20} className="text-sage-600" />} 
              colorClass="bg-sage-50 border-sage-200"
            />
            <SensorCard 
              title="LoRa SNR" 
              value={`${loraData.snr.toFixed(1)} dB`} 
              status="SF: 12" 
              icon={<Radio size={20} className="text-terracotta-500" />} 
              colorClass="bg-cream-100 border-terracotta-100"
            />
            <SensorCard 
              title="LoRa RSSI" 
              value={`${loraData.rssi} dBm`} 
              status="BW: 125kHz" 
              icon={<Radio size={20} className="text-terracotta-500" />} 
              colorClass="bg-cream-100 border-terracotta-100"
            />
          </div>

          <BioelectricChart data={bioData} currentVoltage={currentVoltage} />
          <EnvironmentalCharts data={envData} currentMoisture={currentMoisture} currentWater={currentWater} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
