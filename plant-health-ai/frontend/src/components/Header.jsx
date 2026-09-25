import React from 'react';
import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm shrink-0 z-10">
      <div className="flex items-center gap-2">
        <div className="bg-nature-500 p-1.5 rounded-lg text-white">
          <Leaf size={24} />
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Plant Health AI</h1>
      </div>
      
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
        <a href="#" className="text-nature-700 font-semibold border-b-2 border-nature-500 pb-1">Dashboard</a>
        <a href="#" className="hover:text-nature-700 transition-colors">Plant Analysis</a>
        <a href="#" className="hover:text-nature-700 transition-colors">Live Monitoring</a>
        <a href="#" className="hover:text-nature-700 transition-colors">History</a>
      </div>

      <div className="flex items-center gap-2 bg-nature-50 px-3 py-1.5 rounded-full border border-nature-100">
        <div className="w-2.5 h-2.5 bg-nature-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
        <span className="text-sm font-medium text-nature-700">System Online</span>
      </div>
    </header>
  );
};

export default Header;
