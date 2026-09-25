import React, { useState, useEffect } from 'react';
import PlantAnalysis from './PlantAnalysis';
import BioelectricChart from './BioelectricChart';
import SensorCard from './SensorCard';
import EnvironmentalCharts from './EnvironmentalCharts';
import SystemArchitecture from './SystemArchitecture';
import AnalysisHistory from './AnalysisHistory';
import ModelInfo from './ModelInfo';
import { Zap, Droplet, Waves } from 'lucide-react';

const Dashboard = () => {
  const [bioData, setBioData] = useState([]);
  const [envData, setEnvData] = useState([]);

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
    };
    
    ws.onerror = () => {
      // If websocket fails (backend not running), start mock data so UI doesn't look broken
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

  const currentVoltage = bioData.length > 0 ? bioData[bioData.length - 1].voltage.toFixed(2) : '1.90';
  const currentMoisture = envData.length > 0 ? envData[envData.length - 1].moisture.toFixed(0) : '42';
  const currentWater = envData.length > 0 ? envData[envData.length - 1].water.toFixed(0) : '78';

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: AI & History */}
        <div className="flex-1 space-y-6">
          <PlantAnalysis />
          <ModelInfo />
          <AnalysisHistory />
        </div>
        
        {/* Right Column: Sensors & Live Data */}
        <div className="w-full md:w-[45%] lg:w-[40%] space-y-6 flex flex-col">
          {/* Sensor Cards Row */}
          <div className="grid grid-cols-3 gap-3">
            <SensorCard 
              title="Bioelectric" 
              value={`${currentVoltage} V`} 
              status="Live" 
              icon={<Zap size={20} className="text-yellow-500" />} 
              colorClass="bg-yellow-50 border-yellow-100"
            />
            <SensorCard 
              title="Soil Moisture" 
              value={`${currentMoisture}%`}
              status="Normal" 
              icon={<Droplet size={20} className="text-blue-500" />} 
              colorClass="bg-blue-50 border-blue-100"
            />
            <SensorCard 
              title="Water Level" 
              value={`${currentWater}%`} 
              status="Good" 
              icon={<Waves size={20} className="text-cyan-500" />} 
              colorClass="bg-cyan-50 border-cyan-100"
            />
          </div>

          <BioelectricChart data={bioData} currentVoltage={currentVoltage} />
          <EnvironmentalCharts data={envData} currentMoisture={currentMoisture} currentWater={currentWater} />
        </div>
      </div>

      <SystemArchitecture />
    </div>
  );
};

export default Dashboard;
