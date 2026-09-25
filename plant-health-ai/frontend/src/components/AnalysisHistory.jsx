import React from 'react';
import { Camera, Cpu, Wifi, Database, Search } from 'lucide-react';

const AnalysisHistory = () => {
  const historyData = [
    { id: 1, date: 'Today, 09:41', plant: 'Tomato', disease: 'Early Blight', confidence: '93.2%', status: 'Detected' },
    { id: 2, date: 'Yesterday, 14:20', plant: 'Tomato', disease: 'Healthy', confidence: '96.1%', status: 'Healthy' },
    { id: 3, date: 'Oct 12, 10:15', plant: 'Grape', disease: 'Black Rot', confidence: '89.7%', status: 'Detected' },
    { id: 4, date: 'Oct 10, 08:30', plant: 'Apple', disease: 'Apple Scab', confidence: '91.4%', status: 'Detected' },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold text-gray-800">Recent Analysis</h2>
        <button className="text-xs text-nature-600 font-medium hover:text-nature-700">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plant</th>
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Disease</th>
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Confidence</th>
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {historyData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 text-sm text-gray-600">{item.date}</td>
                <td className="py-3 text-sm font-medium text-gray-900">{item.plant}</td>
                <td className="py-3 text-sm text-gray-600">{item.disease}</td>
                <td className="py-3 text-sm font-medium text-gray-700">{item.confidence}</td>
                <td className="py-3 text-sm">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Healthy' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisHistory;
