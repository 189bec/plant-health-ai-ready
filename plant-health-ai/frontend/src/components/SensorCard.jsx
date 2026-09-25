import React from 'react';

const SensorCard = ({ title, value, status, icon, colorClass }) => {
  return (
    <div className={`p-4 rounded-xl border ${colorClass} flex flex-col justify-between`}>
      <div className="flex justify-between items-start mb-2">
        <div className="bg-white p-1.5 rounded-lg shadow-sm">
          {icon}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white text-gray-700 shadow-sm">
          {status}
        </span>
      </div>
      <div>
        <h4 className="text-xs font-medium text-gray-500 mb-0.5">{title}</h4>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default SensorCard;
