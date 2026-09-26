import React from 'react';
import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-terracotta-200 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm shrink-0 z-10">
      <div className="flex items-center gap-2">
        <div className="bg-sage-600 p-1.5 rounded-lg text-white">
          <Leaf size={24} />
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">ByteBenders <span className="font-medium text-sage-600">| Plant Health Edge AI</span></h1>
      </div>
      
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
        <a href="#" className="text-terracotta-700 font-semibold border-b-2 border-terracotta-500 pb-1">Dashboard</a>
        <a href="#" className="hover:text-sage-700 transition-colors">Plant Analysis</a>
        <a href="#" className="hover:text-sage-700 transition-colors">Live Monitoring</a>
        <a href="#" className="hover:text-sage-700 transition-colors">Architecture</a>
      </div>

      <div className="flex items-center gap-2 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-200">
        <div className="w-2.5 h-2.5 bg-sage-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(96,129,96,0.6)]"></div>
        <span className="text-sm font-bold text-sage-800">System Online</span>
      </div>
    </header>
  );
};

export default Header;
