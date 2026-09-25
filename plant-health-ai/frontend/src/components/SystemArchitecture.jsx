import React from 'react';
import { Leaf, Zap, Cpu, Wifi, Server, MonitorSmartphone, Camera, Box, ScanLine } from 'lucide-react';

const ArchitectureNode = ({ icon: Icon, label, sublabel, color }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`p-3 rounded-xl shadow-sm border ${color} bg-white z-10 relative`}>
      <Icon size={24} className="opacity-80" />
    </div>
    <div className="text-center">
      <p className="text-sm font-bold text-gray-800">{label}</p>
      {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
    </div>
  </div>
);

const SystemArchitecture = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-md font-bold text-gray-800 mb-6">System Architecture</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
        
        {/* Background connecting lines for desktop */}
        <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gray-200 -z-0"></div>

        {/* Hardware Flow */}
        <div className="flex flex-col items-center gap-6 md:gap-0 w-full md:flex-row justify-between relative">
          
          <div className="flex flex-col items-center relative w-full md:w-auto">
            <ArchitectureNode 
              icon={Leaf} 
              label="Plant" 
              color="border-green-200 text-green-600" 
            />
            {/* Vertical connector for mobile */}
            <div className="h-6 w-0.5 bg-gray-200 md:hidden my-2"></div>
          </div>
          
          <div className="flex flex-col items-center relative w-full md:w-auto">
            <ArchitectureNode 
              icon={Zap} 
              label="Sensors" 
              sublabel="Electrodes, Soil, Water"
              color="border-yellow-200 text-yellow-600" 
            />
            <div className="h-6 w-0.5 bg-gray-200 md:hidden my-2"></div>
          </div>
          
          <div className="flex flex-col items-center relative w-full md:w-auto">
            <ArchitectureNode 
              icon={Cpu} 
              label="Arduino" 
              color="border-blue-200 text-blue-600" 
            />
            <div className="h-6 w-0.5 bg-gray-200 md:hidden my-2"></div>
          </div>
          
          <div className="flex flex-col items-center relative w-full md:w-auto">
            <ArchitectureNode 
              icon={Wifi} 
              label="LoRa / Wi-Fi" 
              color="border-indigo-200 text-indigo-600" 
            />
            <div className="h-6 w-0.5 bg-gray-200 md:hidden my-2"></div>
          </div>
          
          <div className="flex flex-col items-center relative w-full md:w-auto">
            <ArchitectureNode 
              icon={Server} 
              label="Backend" 
              sublabel="API & Database"
              color="border-purple-200 text-purple-600" 
            />
            <div className="h-6 w-0.5 bg-gray-200 md:hidden my-2"></div>
          </div>
          
          <div className="flex flex-col items-center relative w-full md:w-auto">
            <ArchitectureNode 
              icon={MonitorSmartphone} 
              label="Plant Health AI" 
              sublabel="Dashboard"
              color="border-nature-300 text-nature-600" 
            />
          </div>

        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
          
          {/* Background connecting lines for desktop */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gray-200 -z-0"></div>

          {/* AI Flow */}
          <div className="flex flex-col items-center gap-6 md:gap-0 w-full md:flex-row justify-between relative max-w-3xl mx-auto">
            
            <div className="flex flex-col items-center relative w-full md:w-auto">
              <ArchitectureNode 
                icon={Camera} 
                label="Camera" 
                color="border-gray-300 text-gray-700" 
              />
              <div className="h-6 w-0.5 bg-gray-200 md:hidden my-2"></div>
            </div>
            
            <div className="flex flex-col items-center relative w-full md:w-auto">
              <ArchitectureNode 
                icon={Box} 
                label="YOLOv5" 
                sublabel="Object Detection"
                color="border-red-200 text-red-600" 
              />
              <div className="h-6 w-0.5 bg-gray-200 md:hidden my-2"></div>
            </div>
            
            <div className="flex flex-col items-center relative w-full md:w-auto">
              <ArchitectureNode 
                icon={ScanLine} 
                label="ONNX" 
                sublabel="Model Format"
                color="border-orange-200 text-orange-600" 
              />
              <div className="h-6 w-0.5 bg-gray-200 md:hidden my-2"></div>
            </div>
            
            <div className="flex flex-col items-center relative w-full md:w-auto">
              <ArchitectureNode 
                icon={Leaf} 
                label="Disease Detection" 
                sublabel="Inference Result"
                color="border-nature-300 text-nature-600" 
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default SystemArchitecture;
