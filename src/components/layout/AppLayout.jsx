import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

export function AppLayout() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-aura-softBg dark:bg-aura-darkBg text-slate-800 dark:text-slate-100 transition-colors">
      {/* Desktop Sidebar (visible on lg screens) */}
      <div className="hidden lg:block">
        <Sidebar onCloseMobile={() => setIsMobileDrawerOpen(false)} />
      </div>

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar onOpenMobile={() => setIsMobileDrawerOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 pb-28 lg:pb-12">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Responsive Mobile Drawer & Bottom Bar */}
      <MobileNav
        isDrawerOpen={isMobileDrawerOpen}
        setIsDrawerOpen={setIsMobileDrawerOpen}
      />
    </div>
  );
}
