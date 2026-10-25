import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Package,
  BookOpen,
  TrendingUp,
  Sparkles,
  Clock,
  Check,
  Filter,
  ExternalLink,
  Volume2,
  VolumeX,
  Smartphone
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { useNotifications } from '../context/NotificationContext';

export function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    pushStatus,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    requestPushPermission
  } = useNotifications();

  const [selectedFilter, setSelectedFilter] = useState('All');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'medical': return ShieldCheck;
      case 'essentials': return Package;
      case 'learning': return BookOpen;
      case 'growth': return TrendingUp;
      case 'ai': return Sparkles;
      default: return Clock;
    }
  };

  const getBadgeVariant = (category) => {
    switch (category) {
      case 'medical': return 'ocean';
      case 'essentials': return 'danger';
      case 'learning': return 'aqua';
      case 'growth': return 'teal';
      default: return 'navy';
    }
  };

  const getCategoryLink = (category) => {
    switch (category) {
      case 'medical': return '/medical';
      case 'essentials': return '/essentials';
      case 'learning': return '/learning';
      case 'growth': return '/growth';
      case 'ai': return '/ai-assistant';
      default: return '/dashboard';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (selectedFilter !== 'All' && n.category !== selectedFilter) return false;
    return true;
  });

  const sections = ['Today', 'Upcoming', 'Earlier'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navyBlue tracking-tight">
              Notifications & Reminders
            </h1>
            {unreadCount > 0 && (
              <Badge variant="aqua" size="sm">
                {unreadCount} Unread
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-navyBlue/70 mt-0.5">
            Stay informed with clinic checkup alerts, medication reminders, and low inventory notices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              icon={CheckCircle2}
              onClick={markAllAsRead}
            >
              Mark All Read
            </Button>
          )}

          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              className="text-navyBlue/60 hover:text-red-600 hover:bg-red-50"
              onClick={clearAllNotifications}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Browser Push Notification Permission Banner */}
      <Card className="p-4 sm:p-5 border-slate-200 bg-pureWhite shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-aquaMist/30 text-deepOcean flex items-center justify-center shrink-0 mt-0.5">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-navyBlue">
                  Web Push Notifications
                </h3>
                <Badge
                  variant={pushStatus === 'granted' ? 'mint' : pushStatus === 'denied' ? 'danger' : 'yellow'}
                  size="sm"
                >
                  {pushStatus === 'granted' ? 'Enabled' : pushStatus === 'denied' ? 'Blocked' : 'Action Needed'}
                </Badge>
              </div>
              <p className="text-xs text-navyBlue/70 mt-0.5">
                {pushStatus === 'granted'
                  ? 'Browser push reminders are active for vaccination dates, appointment times, and diaper restocks.'
                  : 'Enable browser notifications to receive critical vaccine reminders even when LittleAura is closed.'}
              </p>
            </div>
          </div>

          {pushStatus !== 'granted' && (
            <Button
              variant="primary"
              size="sm"
              onClick={requestPushPermission}
              className="shrink-0"
            >
              Enable Notifications
            </Button>
          )}
        </div>
      </Card>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {['All', 'medical', 'essentials', 'learning', 'growth', 'ai'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap capitalize ${
              selectedFilter === cat
                ? 'bg-deepOcean text-pureWhite shadow-xs'
                : 'bg-pureWhite border border-slate-200 text-navyBlue/70 hover:bg-slate-50'
            }`}
          >
            {cat === 'ai' ? 'AI Assistant' : cat}
          </button>
        ))}
      </div>

      {/* Grouped Notifications Stream */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="All caught up!"
          description="There are no active alerts or reminders in this category."
          actionText="Show All Notifications"
          onAction={() => setSelectedFilter('All')}
        />
      ) : (
        <div className="space-y-6">
          {sections.map((sec) => {
            const secItems = filteredNotifications.filter(n => n.section === sec);
            if (secItems.length === 0) return null;

            return (
              <div key={sec} className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navyBlue/50 px-1">
                  {sec}
                </h3>

                <div className="space-y-2.5">
                  {secItems.map((n) => {
                    const Icon = getCategoryIcon(n.category);
                    const badgeVariant = getBadgeVariant(n.category);
                    const link = getCategoryLink(n.category);

                    return (
                      <div
                        key={n.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                          !n.read
                            ? 'bg-aquaMist/15 border-deepOcean/40 shadow-xs'
                            : 'bg-pureWhite border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 flex-1">
                          <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                            !n.read ? 'bg-deepOcean text-pureWhite' : 'bg-slate-100 text-navyBlue/70'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="space-y-1 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant={badgeVariant} size="sm">
                                {n.category.toUpperCase()}
                              </Badge>
                              <h4 className={`text-sm ${!n.read ? 'font-black text-navyBlue' : 'font-bold text-navyBlue/80'}`}>
                                {n.title}
                              </h4>
                              {!n.read && (
                                <span className="w-2 h-2 rounded-full bg-deepOcean animate-pulse" />
                              )}
                            </div>

                            <p className="text-xs text-navyBlue/75 leading-relaxed">
                              {n.description}
                            </p>

                            <div className="flex items-center gap-4 text-[11px] text-navyBlue/60 pt-1">
                              <span>{n.time}</span>
                              <Link
                                to={link}
                                className="font-semibold text-deepOcean hover:underline flex items-center gap-1"
                              >
                                <span>Open {n.category}</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          {!n.read && (
                            <button
                              type="button"
                              onClick={() => markAsRead(n.id)}
                              className="p-1.5 rounded-lg text-deepOcean hover:bg-aquaMist/20 transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteNotification(n.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Dismiss notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
