import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  TrendingUp,
  FileText,
  Clock,
  Package,
  Bot,
  Camera,
  BookOpen,
  GitCommit,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export function Sidebar({ onCloseMobile }) {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { unreadCount } = useNotifications();

  const mainNavigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Child Profile', path: '/child', icon: User },
    { name: 'Growth Tracker', path: '/growth', icon: TrendingUp },
    { name: 'Medical Reports', path: '/medical', icon: FileText },
    { name: 'Daily Care', path: '/daily-care', icon: Clock },
    { name: 'Essentials', path: '/essentials', icon: Package },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot, isAi: true },
    { name: 'Photo Insight', path: '/photo-insight', icon: Camera, isAi: true },
    { name: 'Learning Hub', path: '/learning', icon: BookOpen },
    { name: 'Timeline', path: '/timeline', icon: GitCommit },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount },
  ];

  const bottomNavigation = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100">
        <NavLink to="/dashboard" onClick={onCloseMobile} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#26658c] via-[#54acbf] to-[#a7ebf2] p-0.5 shadow-sm group-hover:shadow-aura-glow transition-all">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#26658c]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-[#023859]">
                LittleAura
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-[#a7ebf2] text-[#011c40]">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium -mt-0.5">
              Growing Together
            </p>
          </div>
        </NavLink>
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 mb-2 text-[10px] font-bold tracking-wider uppercase text-slate-400">
          Parenting Modules
        </div>

        {mainNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? item.isAi
                    ? 'bg-gradient-to-r from-[#a7ebf2]/40 to-[#54acbf]/20 text-[#011c40] border border-[#54acbf]/40 font-bold shadow-xs'
                    : 'bg-[#a7ebf2]/30 text-[#023859] border border-[#a7ebf2] shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#023859]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? item.isAi ? 'text-[#26658c]' : 'text-[#26658c]'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.isAi ? (
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded-md bg-[#54acbf]/15 text-[#26658c]">
                  AI
                </span>
              ) : item.badge && item.badge > 0 ? (
                <span className="w-5 h-5 rounded-full bg-[#26658c] text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          );
        })}

        <div className="pt-4 pb-2 px-3 text-[10px] font-bold tracking-wider uppercase text-slate-400">
          Account & Controls
        </div>

        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#a7ebf2]/30 text-[#023859] border border-[#a7ebf2] font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#023859]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#26658c]' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom User Profile Card */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <NavLink to="/profile" onClick={onCloseMobile} className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-100 ring-2 ring-[#a7ebf2] shrink-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'}
                alt={user?.name || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <h5 className="text-xs font-bold text-[#023859] truncate">
                {user?.name || 'Gokul'}
              </h5>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.role || 'Parent Account'}
              </p>
            </div>
          </NavLink>

          <button
            onClick={logout}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Log Out"
            aria-label="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
