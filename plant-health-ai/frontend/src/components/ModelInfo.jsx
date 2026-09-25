import React from 'react';
import { Database, Layers, CheckCircle2, Box } from 'lucide-react';

const ModelInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Database size={20} className="text-nature-600" />
          Model Information
        </h2>
        <span className="flex items-center gap-1 text-xs font-medium text-nature-700 bg-nature-50 px-2.5 py-1 rounded-full">
          <CheckCircle2 size={14} />
          Active
        </span>
      </div>
      
      <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1">Architecture</p>
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-blue-500" />
            <p className="text-sm font-bold text-gray-900">YOLOv5s</p>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1">Dataset</p>
          <div className="flex items-center gap-2">
            <Database size={16} className="text-purple-500" />
            <p className="text-sm font-bold text-gray-900">PlantDoc</p>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1">Classes</p>
          <div className="flex items-center gap-2">
            <Box size={16} className="text-orange-500" />
            <p className="text-sm font-bold text-gray-900">29</p>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1">Input / Format</p>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <p className="text-sm font-bold text-gray-900">640x640 ONNX</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModelInfo;
