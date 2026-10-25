import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  Bot,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { Sidebar } from './Sidebar';

export function MobileNav({ isDrawerOpen, setIsDrawerOpen }) {
  const quickLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Daily Care', path: '/daily-care', icon: Clock },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot, isAi: true },
    { name: 'Growth', path: '/growth', icon: TrendingUp },
  ];

  return (
    <>
      {/* Off-canvas Drawer for full menu on mobile/tablet */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#011c40]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative z-10 w-64 max-w-xs h-full bg-white shadow-2xl animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar onCloseMobile={() => setIsDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar on Small Screens */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 z-30 flex items-center justify-around shadow-lg">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#26658c] font-bold'
                    : 'text-slate-500 hover:text-[#023859]'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </NavLink>
          );
        })}

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-1 px-3 text-slate-500 hover:text-[#023859] rounded-xl"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Menu</span>
        </button>
      </nav>
    </>
  );
}

export default MobileNav;
