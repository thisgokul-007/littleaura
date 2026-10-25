import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  ChevronDown,
  Plus,
  Check,
  User,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useChild } from '../../context/ChildContext';
import { useNotifications } from '../../context/NotificationContext';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export function Topbar({ onOpenMobile }) {
  const { user } = useAuth();
  const { child, childrenList, switchChild, addChild } = useChild();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // New child form
  const [newChildData, setNewChildData] = useState({
    name: '',
    dateOfBirth: '2026-01-01',
    gender: 'Girl',
    bloodGroup: 'O+',
    pediatrician: ''
  });

  // Dynamic greeting based on current hour
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateChild = (e) => {
    e.preventDefault();
    if (!newChildData.name.trim()) return;
    addChild(newChildData);
    setIsAddChildModalOpen(false);
    setIsDropdownOpen(false);
    setNewChildData({
      name: '',
      dateOfBirth: '2026-01-01',
      gender: 'Girl',
      bloodGroup: 'O+',
      pediatrician: ''
    });
  };

  return (
    <header className="h-16 px-4 md:px-8 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Left: Mobile hamburger & Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-sm md:text-base font-bold text-[#023859] flex items-center gap-1.5">
            <span>{greeting}, {user?.name?.split(' ')[0] || 'Parent'}</span>
            <span className="hidden sm:inline-block">🌱</span>
          </h1>
          <p className="hidden sm:block text-[11px] text-slate-500 font-medium">
            Active Profile: <span className="font-semibold text-[#26658c]">{child.name}</span> ({child.age})
          </p>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex items-center max-w-xs w-full mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search records, vaccines, routines..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:border-[#26658c] focus:bg-white text-[#011c40] placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#26658c]/20"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Child Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a7ebf2]/30 border border-[#a7ebf2] hover:bg-[#a7ebf2]/50 transition-colors shadow-xs"
            aria-label="Select Child Profile"
          >
            <div className="w-5 h-5 rounded-full bg-[#26658c] text-white flex items-center justify-center text-[10px] font-bold">
              {child.name?.[0] || 'C'}
            </div>
            <span className="text-xs font-bold text-[#023859]">
              {child.name}
            </span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">
              ({child.age})
            </span>
            <ChevronDown className="w-3 h-3 text-[#26658c]" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                Switch Child Profile
              </div>

              <div className="max-h-56 overflow-y-auto py-1">
                {childrenList.map((c) => {
                  const isActive = c.id === child.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        switchChild(c.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                        isActive ? 'bg-[#a7ebf2]/20 text-[#023859] font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-[#26658c] border border-slate-200 text-xs">
                          {c.name?.[0]}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-[#023859] leading-tight">{c.name}</p>
                          <p className="text-[10px] text-slate-400">{c.gender} • Born {c.dateOfBirth}</p>
                        </div>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-[#26658c]" />}
                    </button>
                  );
                })}
              </div>

              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={() => setIsAddChildModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#a7ebf2]/30 text-xs font-semibold text-[#023859] flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Child</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-xl text-slate-600 hover:text-[#023859] hover:bg-slate-100 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#26658c] ring-2 ring-white" />
          )}
        </Link>

        {/* Profile Avatar */}
        <Link
          to="/profile"
          className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#54acbf]/40 shrink-0 hover:ring-[#26658c] transition-all"
        >
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'}
            alt="Parent profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Add Child Modal */}
      <Modal
        isOpen={isAddChildModalOpen}
        onClose={() => setIsAddChildModalOpen(false)}
        title="Add Child Profile"
        subtitle="Initialize records and growth monitoring for a new child"
      >
        <form onSubmit={handleCreateChild} className="space-y-4">
          <Input
            label="Child's Full Name"
            placeholder="e.g. Maya Sharma"
            value={newChildData.name}
            onChange={(e) => setNewChildData({ ...newChildData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date of Birth"
              type="date"
              value={newChildData.dateOfBirth}
              onChange={(e) => setNewChildData({ ...newChildData, dateOfBirth: e.target.value })}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                Gender
              </label>
              <select
                value={newChildData.gender}
                onChange={(e) => setNewChildData({ ...newChildData, gender: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#011c40] focus:outline-none focus:ring-2 focus:ring-[#26658c]/20"
              >
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Blood Group (Optional)"
              placeholder="e.g. O+"
              value={newChildData.bloodGroup}
              onChange={(e) => setNewChildData({ ...newChildData, bloodGroup: e.target.value })}
            />
            <Input
              label="Pediatrician Name (Optional)"
              placeholder="e.g. Dr. Ananya Sharma"
              value={newChildData.pediatrician}
              onChange={(e) => setNewChildData({ ...newChildData, pediatrician: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddChildModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              Create Child Profile
            </Button>
          </div>
        </form>
      </Modal>
    </header>
  );
}

export default Topbar;
