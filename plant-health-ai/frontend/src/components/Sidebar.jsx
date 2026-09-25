import React from 'react';
import { LayoutDashboard, Microscope, Activity, History, Settings, Menu } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Microscope, label: 'Plant Analysis', active: false },
    { icon: Activity, label: 'Live Monitoring', active: false },
    { icon: History, label: 'History', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col flex-shrink-0">
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main Menu</p>
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                item.active 
                  ? 'bg-nature-50 text-nature-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={18} className={item.active ? 'text-nature-500' : 'text-gray-400'} />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-100">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-sm font-medium text-gray-800 mb-1">Hardware Status</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">Arduino</span>
            <span className="text-xs font-medium text-nature-600 bg-nature-100 px-2 py-0.5 rounded-full">Connected</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">LoRa/Wi-Fi</span>
            <span className="text-xs font-medium text-nature-600 bg-nature-100 px-2 py-0.5 rounded-full">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
