import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialNotifications } from '../data/demoData';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('littleaura_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [pushStatus, setPushStatus] = useState(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });

  useEffect(() => {
    localStorage.setItem('littleaura_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Register Service Worker for push notifications if supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.info('Service Worker registration note:', err.message);
      });
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `n_${Date.now()}`,
      time: 'Just now',
      read: false,
      section: 'Today',
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);

    // If browser push notifications are granted, display system notification
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(newNotif.title, {
          body: newNotif.description,
          icon: '/favicon.ico'
        });
      } catch (err) {
        console.warn('System push notification failed:', err);
      }
    }
  };

  const requestPushPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Browser notifications are not supported in this browser.');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPushStatus(permission);

      if (permission === 'granted') {
        new Notification('LittleAura Reminders Active', {
          body: 'You will receive gentle reminders for pediatric vaccines, appointments, and daily routines.',
          icon: '/favicon.ico'
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error requesting notification permission:', err);
      return false;
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        pushStatus,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        addNotification,
        requestPushPermission
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export default NotificationContext;
